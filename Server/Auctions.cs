
using MySql.Data.MySqlClient;
namespace Server;


public class Auctions
{
  public record Auction(int id, string title, string slug, string description, int valuationPrice, int priceRange, string images, DateTime endTime, int category, int company);
  public static List<Auction> GetAllAuctions(State state)
  {
    List<Auction> result = new();
    var reader = MySqlHelper.ExecuteReader(state.DB, "select * from Auctions");
    while (reader.Read())
  
    {
      result.Add(new(reader.GetInt32("id"), reader.GetString("title"), reader.GetString("slug"), reader.GetString("description"), reader.GetInt32("valuationPrice"), reader.GetInt32("priceRange"), reader.GetString("images"), reader.GetDateTime("endTime"), reader.GetInt32("category"), reader.GetInt32("company")));
    }

    return result;
  }

  public static List<Auction> GetAllAuctionById(State state, string id)
  {
    List<Auction> result = new();
    var reader = MySqlHelper.ExecuteReader(state.DB, "select * from Auctions where id = @id", new MySqlParameter("@id", id));
    while (reader.Read())
    {
      result.Add(new(reader.GetInt32("id"), reader.GetString("title"), reader.GetString("slug"), reader.GetString("description"), reader.GetInt32("valuationPrice"), reader.GetInt32("priceRange"), reader.GetString("images"), reader.GetDateTime("endTime"), reader.GetInt32("category"), reader.GetInt32("company")));

    }
    return result;

  }

  public static IResult DeleteAuction(int id, State state)
  {
    
      var removed = MySqlHelper.ExecuteNonQuery(state.DB, "delete from Auctions where id = @id", [new ("@id", id)]);
  if  (removed > 0)
  {
    return TypedResults.Ok("Auction deleted successfully.");
  }
  else
  {
    return TypedResults.BadRequest("Failed to delete the auction.");
  }
}
  
      
    
      
      
   

  public static IResult UpdateAuction(Auction auction, State state)
  {
    var result = MySqlHelper.ExecuteScalar(state.DB, "update Auctions set title = @title, slug = @slug, description = @description, valuationPrice = @valuationPrice, priceRange = @priceRange, images = @images, endTime = @endTime, category = @category, company = @company where id = @id",
    new ("@title", auction.title),
    new ("@slug", auction.slug),
    new ("@description", auction.description),
    new ("@valuationPrice", auction.valuationPrice),
    new ("@priceRange", auction.priceRange),
    new ("@images", auction.images),
    new ("@endTime", auction.endTime),
    new ("@category", auction.category),
    new ("@company", auction.company),
    new ("@id", auction.id));
    if (result != null)
    {
      return TypedResults.Ok("Auction updated successfully.");
    }
    else
    {
      return TypedResults.BadRequest("Failed to update the auction.");
    }
  }




  public static IResult CreateAuction(Auction newAuction, State state)
  {
    var result = MySqlHelper.ExecuteScalar(state.DB, "insert into Auctions (title, slug, description, valuationPrice, priceRange, images, endTime, category, company) values (@title, @slug, @description, @valuationPrice, @priceRange, @images, @endTime, @category, @company)",
    [new ("@title", newAuction.title),
  new ("@slug", newAuction.slug),
  new ("@description", newAuction.description),
  new ("@valuationPrice", newAuction.valuationPrice),
  new ("@priceRange", newAuction.priceRange),
  new ("@images", newAuction.images),
  new ("@endTime", newAuction.endTime),
  new ("@category", newAuction.category),
  new ("@company", newAuction.company)]);

    if (result == null)
    {
      return TypedResults.Created($"/auctions/{result}", new { id = result, newAuction.title, newAuction.slug, newAuction.description, newAuction.valuationPrice, newAuction.priceRange, newAuction.images, newAuction.endTime, newAuction.category, newAuction.company });
    }
    else

 
    return TypedResults.BadRequest("Failed to create the auction.");
  }
 
}


