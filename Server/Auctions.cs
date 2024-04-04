using MySql.Data.MySqlClient;
namespace Server;

using System.Data;
using System.Text.Json;
public class Auctions
{
  public record Auction(int id, string title, string slug, string description, int valuationPrice,int priceRange, string images, DateTime endTime, int category, int company);
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
}
