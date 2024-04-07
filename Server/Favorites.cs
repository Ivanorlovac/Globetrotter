using MySql.Data.MySqlClient;
namespace ServerFavorites;
using System.Text.Json;
public class Favorites
{
    public record Favorite(int id, int userId, int auctionId);
    public static List<Favorite> GetAllFavorites(State state)
    {
        List<Favorite> result = new();
        MySqlCommand cmd = new("SELECT * FROM Favorites", state.DB);
        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            result.Add(new(reader.GetInt32("id"), reader.GetInt32("userId"), reader.GetInt32("auctionId")));
        }

        return result;
    }

    public static List<Favorite> GetAllFavoritesUser(State state, string user)
    {
        List<Favorite> result = new();
        MySqlCommand cmd = new("SELECT * FROM Favorites where userId = @user", state.DB);
        cmd.Parameters.AddWithValue("@user", user);

        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            result.Add(new(reader.GetInt32("id"), reader.GetInt32("userId"), reader.GetInt32("auctionId")));
        }

        return result;
    }

    public static bool RemoveOneFavoriteFromDatabase(State state, int favoriteId)
    {
        try
        {
            MySqlCommand cmd = new("DELETE FROM Favorites WHERE id = @favoriteId", state.DB);
            cmd.Parameters.AddWithValue("@favoriteId", favoriteId);

            var affectedRows = cmd.ExecuteNonQuery();
            return affectedRows > 0;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return false;
        }

    }


    public static bool AddNewFavorite(State state, Favorite NewFavorite)
    {
        try
        {
            MySqlCommand cmd = new("INSERT INTO Favorites (userId, auctionId) VALUES (@userId, @auctionId)", state.DB);
            cmd.Parameters.AddWithValue("@userId", NewFavorite.userId);
            cmd.Parameters.AddWithValue("@auctionId", NewFavorite.auctionId);

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
