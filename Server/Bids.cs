using MySql.Data.MySqlClient;
namespace Server;
using System.Text.Json;
public class Bids
{
    public record Bid(int id, int auctionId, int userId, int amount, DateTime time);
    public static List<Bid> GetAllBids(State state)
    {
        List<Bid> result = new();
        MySqlCommand cmd = new("select * from Bids", state.DB);
        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            result.Add(new(reader.GetInt32("id"), reader.GetInt32("auctionId"), reader.GetInt32("userId"), reader.GetInt32("amount"), reader.GetDateTime("time")));
        }

        return result;
    }

    public static List<Bid> GetAllBidsUser(State state, string user)
    {
        List<Bid> result = new();
        MySqlCommand cmd = new("select * from Bids where userId = @user", state.DB);
        cmd.Parameters.AddWithValue("@user", user);

        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            result.Add(new(reader.GetInt32("id"), reader.GetInt32("auctionId"), reader.GetInt32("userId"), reader.GetInt32("amount"), reader.GetDateTime("time")));
        }

        return result;
    }

    public static List<Bid> GetAllBidsAuction(State state, HttpContext context, string auction)
    {
        List<Bid> result = new();
        MySqlCommand cmd = new("select * from Bids where auctionId = @auction", state.DB);
        cmd.Parameters.AddWithValue("@auction", auction);

        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            result.Add(new(reader.GetInt32("id"), reader.GetInt32("auctionId"), reader.GetInt32("userId"), reader.GetInt32("amount"), reader.GetDateTime("time")));
        }
        return result;
    }

    public static List<Bid> GetAllBidsUserAuction(State state, string user, string auction)
    {
        List<Bid> result = new();
        MySqlCommand cmd = new("select * from Bids where userId = @user AND auctionId = @auction", state.DB);
        cmd.Parameters.AddWithValue("@user", user);
        cmd.Parameters.AddWithValue("@auction", auction);

        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            result.Add(new(reader.GetInt32("id"), reader.GetInt32("auctionId"), reader.GetInt32("userId"), reader.GetInt32("amount"), reader.GetDateTime("time")));
        }

        return result;
    }

    public static bool CreateBid(State state, Bid newBid)
    {
        try
        {
            using var cmd = new MySqlCommand("insert into Bids (auctionId, userId, amount, time) values (@auctionId, @userId, @amount, @time)", state.DB);
            cmd.Parameters.AddWithValue("@auctionId", newBid.auctionId);
            cmd.Parameters.AddWithValue("@userId", newBid.userId);
            cmd.Parameters.AddWithValue("@amount", newBid.amount);
            cmd.Parameters.AddWithValue("@time", newBid.time);
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
