using MySql.Data.MySqlClient;
using Org.BouncyCastle.Bcpg;
namespace Server;
public class Favorites
{
    public record Favorite(string Id, string UserId, string AuctionId);


    public static List<Favorite> GetAllFavoritesUser(int user, State state)
    {
        List<Favorite> result = new();
        var reader = MySqlHelper.ExecuteReader(state.DB, "SELECT * FROM Favorites WHERE userId = @UserId", [new("@UserId", user)]);


        while (reader.Read())
        {
            result.Add(new(
            Convert.ToString(reader.GetInt32("id")),
            Convert.ToString(reader.GetInt32("userId")),
            Convert.ToString(reader.GetInt32("auctionId"))));
        }


        return result;
    }


    public static IResult RemoveOneFavoriteFromDatabase(int FavoriteId, State state)
    {
        var removed = MySqlHelper.ExecuteNonQuery(state.DB, "DELETE FROM Favorites WHERE id = @FavoriteId", [new("@FavoriteId", FavoriteId)]);
        if (removed == 1)
        {
            return TypedResults.Ok("Favorite removed successfully.");
        }
        else
        {
            return TypedResults.NotFound("Failed to remove favorite.");
        }
    }


    public static IResult AddNewFavorite(Favorite NewFavorite, State state)
    {
        var result = MySqlHelper.ExecuteNonQuery(state.DB, "INSERT INTO Favorites (userId, auctionId) VALUES (@userId, @auctionId)", [new("@UserId", Convert.ToInt32(NewFavorite.UserId)), new("@AuctionId", Convert.ToInt32(NewFavorite.AuctionId))]);


        if (result == 1)
        {
            return TypedResults.Ok("Favorite added successfully.");
        }
        else
        {
            return TypedResults.Problem();
        }
    }
}
