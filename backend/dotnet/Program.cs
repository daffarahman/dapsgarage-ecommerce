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

api.MapGet("/products", async (AppDbContext db, int offset = 0, int limit = 10) =>
{
    offset = Math.Max(offset, 0);
    limit = Math.Clamp(limit, 1, 100);

    var products = await (
        from p in db.Products
        join c in db.Categories on p.CategoryId equals c.Id into categoryJoin
        from c in categoryJoin.DefaultIfEmpty()
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
    )
    .Skip(offset)
    .Take(limit)
    .ToListAsync();

    return Results.Ok(products);
})
.WithName("GetProducts");

app.Run();
