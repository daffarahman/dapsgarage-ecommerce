namespace GarageApi.Models;

public class Product
{
    public required Guid Id { get; set; }
    public required string Title { get; set; }
    public required string Slug { get; set; }
    public string Description { get; set; } = string.Empty;
    public required Guid CategoryId { get; set; }
    public int Year { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public required decimal Price { get; set; }
    public required int Stock { get; set; }
    public decimal Discount { get; set; }
    public required DateTime CreatedAt { get; set; }
}