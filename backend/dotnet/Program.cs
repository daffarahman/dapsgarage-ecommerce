using Microsoft.EntityFrameworkCore;
using GarageApi.Data;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);
const string corsPolicyName = "FrontendOrigins";

// Add services to the container.
builder.Services.AddOpenApi();

// Configure CORS origins
var configuredCorsOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? [];

var corsOriginsFromEnv = Environment.GetEnvironmentVariable("CORS_ALLOWED_ORIGINS");
if (!string.IsNullOrWhiteSpace(corsOriginsFromEnv))
{
    configuredCorsOrigins = configuredCorsOrigins
        .Concat(corsOriginsFromEnv.Split(',', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries))
        .ToArray();
}

configuredCorsOrigins = configuredCorsOrigins
    .Distinct(StringComparer.OrdinalIgnoreCase)
    .ToArray();

if (configuredCorsOrigins.Length == 0)
{
    throw new InvalidOperationException("No CORS origins configured. Set Cors:AllowedOrigins or CORS_ALLOWED_ORIGINS.");
}

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName, policy =>
    {
        policy
            .WithOrigins(configuredCorsOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Configure Database
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
app.UseCors(corsPolicyName);

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

api.MapGet("/categories/{slug}", async (AppDbContext db, string slug) =>
{
    var category = await (
        from c in db.Categories
        where c.Slug == slug
        select new
        {
            c.Id,
            c.Name,
            c.Slug
        }
    ).FirstOrDefaultAsync();

    return category is null ? Results.NotFound() : Results.Ok(category);
})
.WithName("GetCategoryBySlug");

api.MapGet("/products", async (
    AppDbContext db,
    int offset = 0,
    int limit = 10,
    bool? in_stock = null,
    string? category = null
) =>
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

    if (!string.IsNullOrWhiteSpace(category))
    {
        productsQuery = productsQuery.Where(item => item.Category != null && item.Category.Slug == category);
    }

    var products = await productsQuery
        .Select(item => new
        {
            item.Product.Id,
            item.Product.Title,
            item.Product.Slug,
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

api.MapGet("/products/{slug}", async (AppDbContext db, string slug) =>
{
    var product = await (
        from p in db.Products
        join c in db.Categories on p.CategoryId equals c.Id into categoryJoin
        from c in categoryJoin.DefaultIfEmpty()
        where p.Slug == slug
        select new
        {
            p.Id,
            p.Title,
            p.Slug,
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
.WithName("GetProductBySlug");

app.Run();
