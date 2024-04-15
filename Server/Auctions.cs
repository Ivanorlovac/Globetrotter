using MySql.Data.MySqlClient;
namespace Server;




public class Auctions
{
  public record Auction(int id, string title, string slug, string description, int valuationPrice, int priceRange, string imagesString, DateTime endTime, string category, string creator);


  public record AuctionEndPoint(string id, string title, string slug, string description, int valuationPrice, int priceRange, List<string> images, DateTime endTime, string category, string creator, string creatorImage);

  public record AuctionSeller(string id, string title, string slug, string description, int valuationPrice, int priceRange, DateTime endTime, string category, string creator, string creatorImage);


  public static List<AuctionEndPoint> GetAllAuctions(State state)
  {
    List<AuctionEndPoint> result = new();
    using var reader = MySqlHelper.ExecuteReader(state.DB, @"SELECT a.id, a.title, a.slug, a.description, a.valuationPrice, a.priceRange, a.images, a.endTime, c.companyName as creator, c.logo as creatorImage, cat.name as category FROM Auctions as a
LEFT JOIN Companies c ON a.company = c.id
LEFT JOIN Categories cat ON cat.id = a.category");
    while (reader.Read())






    {
      var imagesArray = reader.GetString("images")
                                    .Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries)
                                    .Select(img => img.Trim()
                                                      .Trim(new char[] { '\"', '\r', '\n' })
                                                      )
                                    .ToList();


      result.Add(new(Convert.ToString(reader.GetInt32("id")), reader.GetString("title"), reader.GetString("slug"), reader.GetString("description"), reader.GetInt32("valuationPrice"), reader.GetInt32("priceRange"), imagesArray, reader.GetDateTime("endTime"), reader.GetString("category"), reader.GetString("creator"), reader.GetString("creatorImage")));
    }


    return result;
  }




  public static List<AuctionEndPoint> GetAllAuctionById(State state, string id)
  {
    List<AuctionEndPoint> result = new();
    using var reader = MySqlHelper.ExecuteReader(state.DB, @"SELECT a.id, a.title, a.slug, a.description, a.valuationPrice, a.priceRange, a.images, a.endTime, c.companyName as creator, c.logo as creatorImage, cat.name as category  
    FROM Auctions as a
    LEFT JOIN Companies c ON a.company = c.id
    LEFT JOIN Categories cat ON cat.id = a.category
    WHERE a.id = @id", new MySqlParameter("@id", id));
    while (reader.Read())
    {
      var imagesArray = reader.GetString("images")
                                    .Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries)
                                    .Select(img => img.Trim()
                                                      .Trim(new char[] { '\"', '\r', '\n' })
                                                      )
                                    .ToList();


      result.Add(new(reader.GetInt32("id").ToString(), reader.GetString("title"), reader.GetString("slug"), reader.GetString("description"), reader.GetInt32("valuationPrice"), reader.GetInt32("priceRange"), imagesArray, reader.GetDateTime("endTime"), reader.GetString("category"), reader.GetString("creator"), reader.GetString("creatorImage")));

    }
    return result;
  }

  public static List<AuctionSeller> GetAllAuctionByName(State state, string companyName)
  {
    List<AuctionSeller> result = new();
    using var reader = MySqlHelper.ExecuteReader(state.DB, @"SELECT a.id, a.title, a.slug, a.description, a.valuationPrice, a.priceRange, a.endTime, c.companyName as creator, c.logo as creatorImage, cat.name as category  
    FROM Auctions as a
    LEFT JOIN Companies c ON a.company = c.id
    LEFT JOIN Categories cat ON cat.id = a.category
    WHERE c.companyName = @name", new MySqlParameter("@name", companyName));
    while (reader.Read())
    {
      result.Add(new(reader.GetInt32("id").ToString(), reader.GetString("title"), reader.GetString("slug"), reader.GetString("description"), reader.GetInt32("valuationPrice"), reader.GetInt32("priceRange"), reader.GetDateTime("endTime"), reader.GetString("category"), reader.GetString("creator"), reader.GetString("creatorImage")));
    }
    return result;
  }



  public static IResult DeleteAuction(int id, State state)
  {

    var removed = MySqlHelper.ExecuteNonQuery(state.DB, "delete from Auctions where id = @id", [new("@id", id)]);
    if (removed > 0)
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

    var getCategoryId = Convert.ToInt32(MySqlHelper.ExecuteScalar(state.DB, "SELECT id FROM Categories WHERE name = @category", [new("@category", auction.category)]));
    var getCompanyId = Convert.ToInt32(MySqlHelper.ExecuteScalar(state.DB, "SELECT id FROM Companies WHERE companyName = @company", [new("@company", auction.creator)]));

    var result = MySqlHelper.ExecuteNonQuery(state.DB, "update Auctions set title = @title, slug = @slug, description = @description, valuationPrice = @valuationPrice, priceRange = @priceRange, endTime = @endTime, category = @category, company = @company where id = @id",
    new("@title", auction.title),
    new("@slug", auction.slug),
    new("@description", auction.description),
    new("@valuationPrice", auction.valuationPrice),
    new("@priceRange", auction.priceRange),
    new("@endTime", auction.endTime),
    new("@category", getCategoryId),
    new("@company", getCompanyId),
    new("@id", auction.id));

    if (result == 1)
    {
      return TypedResults.Ok();
    }
    else
    {
      return TypedResults.BadRequest("Failed to update the auction.");
    }
  }

  public static IResult CreateAuction(Auction newAuction, State state)
  {

    var getCategoryId = Convert.ToInt32(MySqlHelper.ExecuteScalar(state.DB, "SELECT id FROM Categories WHERE name = @category", [new("@category", newAuction.category)]));
    var getCompanyId = Convert.ToInt32(MySqlHelper.ExecuteScalar(state.DB, "SELECT id FROM Companies WHERE companyName = @company", [new("@company", newAuction.creator)])); 

    var result = MySqlHelper.ExecuteNonQuery(state.DB, "insert into Auctions (title, slug, description, valuationPrice, priceRange, images, endTime, category, company) values (@title, @slug, @description, @valuationPrice, @priceRange, @images, @endTime, @category, @company)",
      [new("@title", newAuction.title),
      new("@slug", newAuction.slug),
      new("@description", newAuction.description),
      new("@valuationPrice", newAuction.valuationPrice),
      new("@priceRange", newAuction.priceRange),
      new("@images", newAuction.imagesString),
      new("@endTime", newAuction.endTime),
      new("@category", getCategoryId),
      new("@company", getCompanyId)]);

    if (result == 1)
    {
      return TypedResults.Ok(true);
    }
    else
    {
      return TypedResults.Problem();
    }

  }

}


/* {
    "title": "malaga",
    "slug": "malaga",
    "description": "malaga-sun",
    "valuationPrice": 10000,
    "priceRange": 2000,
    "imagesString": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_2PjRXefNjhxZUMOiu2Kv5lM6SJScOx-Gx_1yTet5A&s,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_2PjRXefNjhxZUMOiu2Kv5lM6SJScOx-Gx_1yTet5A&s",
    "category": "all inclusive",
    "endTime": "2024-04-20T15:03",
    "creator": "Suntrip Ab",
    "creatorImage": "https://seeklogo.com/images/S/SunTrip-logo-DD2B572E4F-seeklogo.com.gif"
} */


/* {
    "title": "Malaga sun",
    "slug": "malaga-sun",
    "description": "malaga-sun",
    "valuationPrice": 10000,
    "priceRange": 2000,
    "images": [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_2PjRXefNjhxZUMOiu2Kv5lM6SJScOx-Gx_1yTet5A&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_2PjRXefNjhxZUMOiu2Kv5lM6SJScOx-Gx_1yTet5A&s"
    ],
    "category": "all-inclusive",
    "endTime": "2024-04-13T14:35",
    "creator": "Suntrip Ab",
    "creatorImage": "https://seeklogo.com/images/S/SunTrip-logo-DD2B572E4F-seeklogo.com.gif"
} */

/* {
    "title": "Malaga sun",
    "slug": "malaga-sun",
    "description": "malaga-sun",
    "valuationPrice": 10000,
    "priceRange": 2000,
    "imagesString": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_2PjRXefNjhxZUMOiu2Kv5lM6SJScOx-Gx_1yTet5A&s,https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW_2PjRXefNjhxZUMOiu2Kv5lM6SJScOx-Gx_1yTet5A&s",
    "category": "all-inclusive",
    "endTime": "2024-04-13T14:35",
    "creator": "Suntrip Ab",
    "creatorImage": "https://seeklogo.com/images/S/SunTrip-logo-DD2B572E4F-seeklogo.com.gif"
} */