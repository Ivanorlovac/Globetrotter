using MySql.Data.MySqlClient;
namespace Server;
public class Favorites
{
    public record Favorite(int Id, int UserId, int AuctionId);


    public static List<Favorite> GetAllFavoritesUser(int user, State state)
    {
        List<Favorite> result = new();
        var reader = MySqlHelper.ExecuteReader(state.DB, "SELECT * FROM Favorites WHERE userId = @UserId", [new("@UserId", user)]);


        while (reader.Read())
        {
            result.Add(new(reader.GetInt32("id"), reader.GetInt32("userId"), reader.GetInt32("auctionId")));
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
        var result = MySqlHelper.ExecuteScalar(state.DB, "INSERT INTO Favorites (userId, auctionId) VALUES (@userId, @auctionId) returning id", [new("@UserId", NewFavorite.UserId), new("@AuctionId", NewFavorite.AuctionId)]);


        if (result is int id)
        {
            return TypedResults.Created(id.ToString());
        }
        else
        {
            return TypedResults.Problem();
        }
    }




}
