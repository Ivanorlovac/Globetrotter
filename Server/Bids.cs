using MySql.Data.MySqlClient;
namespace Server;
public class Bids
{
    public record Bid(int id, int auctionId, int userId, int amount, DateTime time);
    public record BidEndpoint(string id, string auctionId, string userId, int amount, DateTime time);


    public static List<BidEndpoint> GetAllBids(State state)
    {
        List<BidEndpoint> result = new();
        using var reader = MySqlHelper.ExecuteReader(state.DB, "select * from Bids");
        while (reader.Read())
        {
            result.Add(new(Convert.ToString(reader.GetInt32("id")), Convert.ToString(reader.GetInt32("auctionId")), Convert.ToString(reader.GetInt32("userId")), reader.GetInt32("amount"), reader.GetDateTime("time")));
        }


        return result;
    }


    public static List<BidEndpoint> GetAllBidsUser(string user, State state)
    {
        List<BidEndpoint> result = new();


        using var reader = MySqlHelper.ExecuteReader(state.DB, "select * from Bids where userId = @user", [new("@user", user)]);
        while (reader.Read())
        {
            result.Add(new(Convert.ToString(reader.GetInt32("id")), Convert.ToString(reader.GetInt32("auctionId")), Convert.ToString(reader.GetInt32("userId")), reader.GetInt32("amount"), reader.GetDateTime("time")));
        }


        return result;
    }

    public static List<BidEndpoint> GetAllBidsAuction(string auction, State state)
    {
        List<BidEndpoint> result = new();
        using var reader = MySqlHelper.ExecuteReader(state.DB, "SELECT * FROM Bids WHERE auctionId = @auction", [new("@auction", auction)]);
        while (reader.Read())
        {
            result.Add(new(Convert.ToString(reader.GetInt32("id")), Convert.ToString(reader.GetInt32("auctionId")), Convert.ToString(reader.GetInt32("userId")), reader.GetInt32("amount"), reader.GetDateTime("time")));
        }
        return result;
    }

    public static List<BidEndpoint> GetAllBidsUserAuction(string user, string auction, State state)
    {
        List<BidEndpoint> result = new();


        using var reader = MySqlHelper.ExecuteReader(state.DB, "select * from Bids where userId = @user AND auctionId = @auction", [new("@user", user), new("@auction", auction)]);
        while (reader.Read())
        {
            result.Add(new(Convert.ToString(reader.GetInt32("id")), Convert.ToString(reader.GetInt32("auctionId")), Convert.ToString(reader.GetInt32("userId")), reader.GetInt32("amount"), reader.GetDateTime("time")));
        }
        return result;
    }


    public static IResult CreateBid(Bid newBid, State state)
    {
        var result = MySqlHelper.ExecuteNonQuery(state.DB,
         "insert into Bids (auctionId, userId, amount, time) values (@auctionId, @userId, @amount, @time)",
         [new("@auctionId", newBid.auctionId), new("@userId", newBid.userId), new("@amount", newBid.amount), new("@time", newBid.time)]);


        if (result == 1)
        {
            return TypedResults.Ok("Bid successfully created");
        }
        else
        {
            return TypedResults.Problem();
        }
    }
}
