using MySql.Data.MySqlClient;




namespace Server;




public class ClosedAuctions
{
    public record ClosedAuction(string id,
                                string title,
                                string slug,
                                string description,
                                int valuationPrice,
                                int priceRange,
                                List<string> images,
                                DateTime endTime,
                                string category,
                                string? winner_user_id = null,
                                int? winner_amount = null,
                                string? creator = null,
                                string? creatorImage = null
                                );


    public static List<ClosedAuction> GetAllClosedAuctions(State state)
    {
        List<ClosedAuction> result = new();

        using var reader = MySqlHelper.ExecuteReader(
            state.DB,
            @"SELECT a.id, a.title, a.slug, a.description, a.valuationPrice, a.priceRange, a.images, a.endTime, cat.name as category, ca.winner as winner_user_id, ca.amount as winner_amount, c.companyName as creator, c.logo as creatorImage  FROM ClosedAuctions ca
                    LEFT JOIN Auctions a ON a.id = ca.auctionID
                    LEFT JOIN Companies c ON a.company = c.id
                    LEFT JOIN Categories cat ON cat.id = a.category;"
        );

        while (reader.Read())
        {
            var imagesArray = reader.GetString("images")
                                    .Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries)
                                    .Select(img => img.Trim()
                                                      .Trim(new char[] { '\"', '\r', '\n' })
                                                      )
                                    .ToList();
            try
            {
                result.Add(new(
                    Convert.ToString(reader.GetInt32("id")),
                    reader.GetString("title"),
                    reader.GetString("slug"),
                    reader.GetString("description"),
                    reader.GetInt32("valuationPrice"),
                    reader.GetInt32("priceRange"),
                    imagesArray,
                    reader.GetDateTime("endTime"),
                    reader.GetString("category"),
                    Convert.ToString(reader.GetInt32("winner_user_id")),
                    reader.GetInt32("winner_amount"),
                    reader.GetString("creator"),
                    reader.GetString("creatorImage")));
            }
            catch
            {
                result.Add(new(
                    Convert.ToString(reader.GetInt32("id")),
                    reader.GetString("title"),
                    reader.GetString("slug"),
                    reader.GetString("description"),
                    reader.GetInt32("valuationPrice"),
                    reader.GetInt32("priceRange"),
                    imagesArray,
                    reader.GetDateTime("endTime"),
                    reader.GetString("category"),
                    null,
                    null,
                    reader.GetString("creator"),
                    reader.GetString("creatorImage")));
            }
        }


        return result;
    }

}
