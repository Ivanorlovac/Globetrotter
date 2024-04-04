
using MySql.Data.MySqlClient;
namespace Server;


public class Auctions
{
  public record Auction(int id, string title, string slug, string description, int valuationPrice, int priceRange, string images, DateTime endTime, int category, int company);
  public static List<Auction> GetAllAuctions(State state)
  {
    List<Auction> result = new();
    MySqlCommand cmd = new MySqlCommand("select * from Auctions ", state.DB);
    using var reader = cmd.ExecuteReader();
    while (reader.Read())
    {
      result.Add(new(reader.GetInt32("id"), reader.GetString("title"), reader.GetString("slug"), reader.GetString("description"), reader.GetInt32("valuationPrice"), reader.GetInt32("priceRange"), reader.GetString("images"), reader.GetDateTime("endTime"), reader.GetInt32("category"), reader.GetInt32("company")));
    }

    return result;
  }

  public static List<Auction> GetAllAuctionById(State state, string id)
  {
    List<Auction> result = new();
    MySqlCommand cmd = new("select * from Auctions WHERE Id = @id", state.DB);
    cmd.Parameters.AddWithValue("@id", id);

    using var reader = cmd.ExecuteReader();
    while (reader.Read())
    {
      result.Add(new(reader.GetInt32("id"), reader.GetString("title"), reader.GetString("slug"), reader.GetString("description"), reader.GetInt32("valuationPrice"), reader.GetInt32("priceRange"), reader.GetString("images"), reader.GetDateTime("endTime"), reader.GetInt32("category"), reader.GetInt32("company")));

    }
    return result;

  }

  public static bool DeleteAuction(State state, int id)
  {
    try
    {
      using var cmd = new MySqlCommand("delete from Auctions where id = @id", state.DB);
      cmd.Parameters.AddWithValue("@id", id);
      var affectedRows = cmd.ExecuteNonQuery();
      return affectedRows > 0;
    }
    catch (Exception ex)
    {
      Console.WriteLine($"An error occurred: {ex.Message}");
      return false;
    }
  }

  public static bool UpdateAuction(State state, Auction auction)
  {
    try
    {
    using var cmd = new MySqlCommand("update Auctions set title = @title, slug = @slug, description = @description, valuationPrice = @valuationPrice, priceRange = @priceRange, images = @images, endTime = @endTime, category = @category, company = @company where id = @id", state.DB);
    cmd.Parameters.AddWithValue("@id", auction.id);
    cmd.Parameters.AddWithValue("@title", auction.title);
    cmd.Parameters.AddWithValue("@slug", auction.slug);
    cmd.Parameters.AddWithValue("@description", auction.description);
    cmd.Parameters.AddWithValue("@valuationPrice", auction.valuationPrice);
    cmd.Parameters.AddWithValue("@priceRange", auction.priceRange);
    cmd.Parameters.AddWithValue("@images", auction.images);
    cmd.Parameters.AddWithValue("@endTime", auction.endTime);
    cmd.Parameters.AddWithValue("@category", auction.category);
    cmd.Parameters.AddWithValue("@company", auction.company);

    var affectedRows = cmd.ExecuteNonQuery();
    return affectedRows > 0;
  }
  catch (Exception ex)
  {
    Console.WriteLine($"An error occurred: {ex.Message}");
    return false;
  }

}
}

