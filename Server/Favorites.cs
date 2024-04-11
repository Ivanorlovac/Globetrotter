using MySql.Data.MySqlClient;
using Org.BouncyCastle.Bcpg;
namespace Server;
public class Favorites
{
    public record FavoriteEndpoint(string Id, string UserId, string AuctionId);
    public record Favorite(int UserId, int AuctionId);



    public static List<FavoriteEndpoint> GetAllFavoritesUser(int user, State state)
    {
        List<FavoriteEndpoint> result = new();
        using var reader = MySqlHelper.ExecuteReader(state.DB, "SELECT * FROM Favorites WHERE userId = @UserId", [new("@UserId", user)]);


        while (reader.Read())
        {
            result.Add(new(
            Convert.ToString(reader.GetInt32("id")),
            Convert.ToString(reader.GetInt32("userId")),
            Convert.ToString(reader.GetInt32("auctionId"))));
        }


        return result;
    }


    public static IResult RemoveOneFavoriteFromDatabase(int userId, int auctionId, State state)
    {
        var removed = MySqlHelper.ExecuteNonQuery(state.DB, "DELETE FROM Favorites WHERE userId = @userId AND auctionId = @auctionId", [new("@userId", userId), new("@auctionId", auctionId)]);
        if (removed == 1)
        {
            return TypedResults.Ok(true);
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
            return TypedResults.Ok(true);
        }
        else
        {
            return TypedResults.Problem();
        }
    }
}
