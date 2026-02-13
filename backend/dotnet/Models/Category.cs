namespace GarageApi.Models;

public class Category
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Slug { get; set; }
    public required DateTime CreatedAt { get; set; }
}