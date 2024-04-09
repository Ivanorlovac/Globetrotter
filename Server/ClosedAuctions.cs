using MySql.Data.MySqlClient;

namespace Server;

public class ClosedAuctions
{
    public record ClosedAuction(int? auctionId = null, int? winner= null, int? amount = null);
    public static List<ClosedAuction> GetAllClosedAuctions(State state)
    {
        List<ClosedAuction> result = new();

        var reader = MySqlHelper.ExecuteReader(
            state.DB,
            "SELECT * FROM ClosedAuctions"
        );
        
        while (reader.Read())
        {
            try
            {
                result.Add(new(reader.GetInt32("auctionId"), reader.GetInt32("winner"), reader.GetInt32("amount")));
            }
            catch
            {
                result.Add(new(reader.GetInt32("auctionId"),null,null));
            }
        }

        return result;
    }
}
