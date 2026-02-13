using Microsoft.EntityFrameworkCore;
using GarageApi.Data;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();

var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var api = app.MapGroup("/api");

api.MapGet("/categories", async (AppDbContext db) =>
{
    var categories = await (
        from c in db.Categories
        select new
        {
            c.Id,
            c.Name,
            c.Slug
        }
    ).ToListAsync();

    return Results.Ok(categories);
})
.WithName("GetCategories");

api.MapGet("/products", async (AppDbContext db, int offset = 0, int limit = 10, bool? in_stock = null, string? slug = null) =>
{
    offset = Math.Max(offset, 0);
    limit = Math.Clamp(limit, 1, 100);

    var productsQuery =
        from p in db.Products
        join c in db.Categories on p.CategoryId equals c.Id into categoryJoin
        from c in categoryJoin.DefaultIfEmpty()
        select new { Product = p, Category = c };

    if (in_stock.HasValue)
    {
        productsQuery = productsQuery.Where(item => in_stock.Value ? item.Product.Stock > 0 : item.Product.Stock <= 0);
    }

    if (!string.IsNullOrWhiteSpace(slug))
    {
        productsQuery = productsQuery.Where(item => item.Category != null && item.Category.Slug == slug);
    }

    var products = await productsQuery
        .Select(item => new
        {
            item.Product.Id,
            item.Product.Title,
            item.Product.Description,
            item.Product.Year,
            item.Product.ImageUrl,
            item.Product.Price,
            item.Product.Stock,
            item.Product.Discount,
            Category = item.Category == null
                ? null
                : new
                {
                    item.Category.Id,
                    item.Category.Name,
                    item.Category.Slug
                }
        })
    .Skip(offset)
    .Take(limit)
    .ToListAsync();

    return Results.Ok(products);
})
.WithName("GetProducts");

api.MapGet("/products/{id:guid}", async (AppDbContext db, Guid id) =>
{
    var product = await (
        from p in db.Products
        join c in db.Categories on p.CategoryId equals c.Id into categoryJoin
        from c in categoryJoin.DefaultIfEmpty()
        where p.Id == id
        select new
        {
            p.Id,
            p.Title,
            p.Description,
            p.Year,
            p.ImageUrl,
            p.Price,
            p.Stock,
            p.Discount,
            Category = c == null
                ? null
                : new
                {
                    c.Id,
                    c.Name,
                    c.Slug
                }
        }
    ).FirstOrDefaultAsync();

    return product is null ? Results.NotFound() : Results.Ok(product);
})
.WithName("GetProductById");

app.Run();
