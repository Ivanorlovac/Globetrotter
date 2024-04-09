using MySql.Data.MySqlClient;
namespace Server;



public class Users
{
    public record User(int id, string username, string password, string role, string name, int? company);
    public static List<User> GetAllUsers(State state)
    {
        List<User> result = new();
        var reader = MySqlHelper.ExecuteReader(state.DB, "select * from Users");

        while (reader.Read())
        {
            if (reader.GetString("role") == "seller")
            {
                result.Add(new(reader.GetInt32("id"), reader.GetString("username"), reader.GetString("password"), reader.GetString("role"), reader.GetString("name"), reader.GetInt32("company")));
            }
            else
            {
                result.Add(new(reader.GetInt32("id"), reader.GetString("username"), reader.GetString("password"), reader.GetString("role"), reader.GetString("name"), null));
            }

        }

        return result;
    }

    public static List<User> GetAllUsersById(string id, State state)
    {
        List<User> result = new();
        var reader = MySqlHelper.ExecuteReader(state.DB, "select * from Users where id = @id", new MySqlParameter("@id", id));

        while (reader.Read())
        {
            if (reader.GetString("role") == "seller")
            {
                result.Add(new(reader.GetInt32("id"), reader.GetString("username"), reader.GetString("password"), reader.GetString("role"), reader.GetString("name"), reader.GetInt32("company")));
            }
            else
            {
                result.Add(new(reader.GetInt32("id"), reader.GetString("username"), reader.GetString("password"), reader.GetString("role"), reader.GetString("name"), null));
            }

        }

        return result;
    }

    public static IResult DeleteUser(int id, State state)
    {
        var removed = MySqlHelper.ExecuteNonQuery(state.DB, "delete from Users where id = @id", new MySqlParameter("@id", id));
        if (removed > 0)
        {
            return Results.Ok("User deleted successfully.");
        }
        else
        {
            return Results.BadRequest("Failed to delete the user.");
        }
    }


    public static IResult UpdateUser(int id, User updatedUser, State state)
    {
        var result = MySqlHelper.ExecuteScalar(state.DB, "update Users set username = @username, password = @password, role = @role, name = @name, company = @company where id = @id",

        new("@username", updatedUser.username),
        new("@password", updatedUser.password),
        new("@role", updatedUser.role),
        new("@name", updatedUser.name),
        new("@company", updatedUser.company),
        new("@id", id));


        if (result == null)
        {
            return Results.Ok("User updated successfully.");
        }
        else
        {
            return Results.BadRequest("Failed to update the user.");
        }
    }



    public static IResult CreateUser(State state, User user)
    {
        var result = MySqlHelper.ExecuteScalar(state.DB, "insert into Users (username, password, role, name, company) values (@username, @password, @role, @name, @company)",
        new("@username", user.username),
        new("@password", user.password),
        new("@role", user.role),
        new("@name", user.name),
        new("@company", user.company));

        if (result == null)
        {
            return TypedResults.Created($"/users/{user.id}", new { user.id, user.username, user.password, user.role, user.name, user.company });
        }
        else
        {
            return TypedResults.BadRequest("Failed to create the user.");
        }
    }
}

            

