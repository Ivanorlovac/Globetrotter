using MySql.Data.MySqlClient;
namespace Server;
public class Bids
{
    public record Bid(int id, int auctionId, int userId, int amount, DateTime time);
    public static List<Bid> GetAllBids(State state)
    {
        List<Bid> result = new();
        var reader = MySqlHelper.ExecuteReader(state.DB, "select * from Bids");
        while (reader.Read())
        {
            result.Add(new(reader.GetInt32("id"), reader.GetInt32("auctionId"), reader.GetInt32("userId"), reader.GetInt32("amount"), reader.GetDateTime("time")));
        }

        return result;
    }

    public static List<Bid> GetAllBidsUser(string user, State state)
    {
        List<Bid> result = new();

        var reader = MySqlHelper.ExecuteReader(state.DB, "select * from Bids where userId = @user", [new("@user", user)]);
        while (reader.Read())
        {
            result.Add(new(reader.GetInt32("id"), reader.GetInt32("auctionId"), reader.GetInt32("userId"), reader.GetInt32("amount"), reader.GetDateTime("time")));
        }

        return result;
    }

    public static List<Bid> GetAllBidsAuction(HttpContext context, string auction, State state)
    {
        List<Bid> result = new();
        var reader = MySqlHelper.ExecuteReader(state.DB, "select * from Bids where auctionId = @auction", [new("@auction", auction)]);
        while (reader.Read())
        {
            result.Add(new(reader.GetInt32("id"), reader.GetInt32("auctionId"), reader.GetInt32("userId"), reader.GetInt32("amount"), reader.GetDateTime("time")));
        }
        return result;
    }

    public static List<Bid> GetAllBidsUserAuction(string user, string auction, State state)
    {
        List<Bid> result = new();

        var reader = MySqlHelper.ExecuteReader(state.DB, "select * from Bids where userId = @user AND auctionId = @auction", [new("@user", user), new("@auction", auction)]);
        while (reader.Read())
        {
            result.Add(new(reader.GetInt32("id"), reader.GetInt32("auctionId"), reader.GetInt32("userId"), reader.GetInt32("amount"), reader.GetDateTime("time")));
        }
        return result;
    }

    public static IResult CreateBid(Bid newBid, State state )
    {
        var result = MySqlHelper.ExecuteNonQuery(state.DB,
         "insert into Bids (auctionId, userId, amount, time) values (@auctionId, @userId, @amount, @time)",
         [new("@auctionId", newBid.auctionId), new("@userId", newBid.userId), new("@amount", newBid.amount), new("@time", newBid.time)]);

        if(result == 1)
        {
            return TypedResults.Ok("Bid successfully created");
        }
        else
        {
            return TypedResults.Problem();
        }
    }
}
