using MySql.Data.MySqlClient;
namespace Server;
using System.Text.Json;
public class Bids
{
    public record Bid(int id, int auctionId, int userId, int amount, DateTime time);
    public static List<Bid> GetAllBids(State state)
    {
        List<Bid> result = new();
        MySqlCommand cmd = new("select * from bids", state.DB);
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
        MySqlCommand cmd = new("select * from bids where userId = @user", state.DB);
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
        MySqlCommand cmd = new("select * from bids where auctionId = @auction", state.DB);
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
        MySqlCommand cmd = new("select * from bids where userId = @user AND auctionId = @auction", state.DB);
        cmd.Parameters.AddWithValue("@user", user);
        cmd.Parameters.AddWithValue("@auction", auction);

        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            result.Add(new(reader.GetInt32("id"), reader.GetInt32("auctionId"), reader.GetInt32("userId"), reader.GetInt32("amount"), reader.GetDateTime("time")));
        }

        return result;
    }

}
