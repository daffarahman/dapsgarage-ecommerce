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

app.MapGet("/categories", async (AppDbContext db) =>
{
    var categories = await db.Categories.ToListAsync();
    return Results.Ok(categories);
})
.WithName("GetCategories");

app.MapGet("/products", async (AppDbContext db) =>
{
    var products = await db.Products.ToListAsync();
    return Results.Ok(products);
})
.WithName("GetProducts");

app.Run();
