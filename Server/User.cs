using MySql.Data.MySqlClient;
namespace Server;






public class Users
{
    public record User(string username, string password, string role, string name, string? creator);

    public record UserEndPoint(string id, string username, string password, string role, string name, string? creator = null, string? creatorImage = null);

    public static List<UserEndPoint> GetAllUsers(State state)
    {
        List<UserEndPoint> result = new();
        using var reader = MySqlHelper.ExecuteReader(state.DB, @"SELECT u.id, u.username, u.password, u.role, u.name, c.companyName, c.logo FROM Users as u
                                                                LEFT JOIN Companies c ON u.company = c.id");
        while (reader.Read())
        {
            if (reader.GetString("role") == "seller")
            {
                result.Add(new(Convert.ToString(reader.GetInt32("id")), reader.GetString("username"), reader.GetString("password"), reader.GetString("role"), reader.GetString("name"), reader.GetString("companyName"), reader.GetString("logo")));
            }
            else
            {
                result.Add(new(Convert.ToString(reader.GetInt32("id")), reader.GetString("username"), reader.GetString("password"), reader.GetString("role"), reader.GetString("name"), null, null));
            }
        }


        return result;
    }

    public static List<UserEndPoint> GetAllUsersById(string id, State state)
    {
        List<UserEndPoint> result = new();
        using var reader = MySqlHelper.ExecuteReader(state.DB, @"SELECT u.id, u.username, u.password, u.role, u.name, c.companyName, c.logo FROM Users as u
                                                                    LEFT JOIN Companies c ON u.company = c.id
                                                                    WHERE u.id = @id", new MySqlParameter("@id", id));


        while (reader.Read())
        {
            if (reader.GetString("role") == "seller")
            {
                result.Add(new(Convert.ToString(reader.GetInt32("id")), reader.GetString("username"), reader.GetString("password"), reader.GetString("role"), reader.GetString("name"), reader.GetString("companyName"), reader.GetString("logo")));
            }
            else
            {
                result.Add(new(Convert.ToString(reader.GetInt32("id")), reader.GetString("username"), reader.GetString("password"), reader.GetString("role"), reader.GetString("name"), null, null));
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
        var getId = "";
/*         if (updatedUser.role == "seller"){
            getId = MySqlHelper.ExecuteScalar(state.DB, "Select id FROM Companies WHERE companyName = @company", [new("@company", updatedUser.creator)]);
        } */

        var result = MySqlHelper.ExecuteScalar(state.DB, "update Users set username = @username, role = @role, name = @name, company = @company where id = @id",
        new("@username", updatedUser.username),
        new("@role", updatedUser.role),
        new("@name", updatedUser.name),
        new("@company", getId),
        new("@id", id));

        if (updatedUser.password != "")
        {
            result = MySqlHelper.ExecuteScalar(state.DB, "update Users set username = @username, password = @password, role = @role, name = @name, company = @company where id = @id",
            new("@username", updatedUser.username),
            new("@password", updatedUser.password),
            new("@role", updatedUser.role),
            new("@name", updatedUser.name),
            new("@company", updatedUser.creator),
            new("@id", id));
        }

        if (result == null)
        {
            return Results.Ok();
        }
        else
        {
            return Results.BadRequest();
        }
    }

    public record Company(string? companyName);

    public static IResult CreateUser(State state, User user)
    {
        int? idCompany = null;
        if (user.role == "seller")
        {
            idCompany = CreateCompanies(state, user.creator); 
        }

        var result = MySqlHelper.ExecuteScalar(state.DB, "insert into Users (username, password, role, name, company) values (@username, @password, @role, @name, @company)",
        new("@username", user.username),
        new("@password", user.password),
        new("@role", user.role),
        new("@name", user.name),
        new("@company", idCompany));

        if (result == null)
        {
            return TypedResults.Ok();
        }
        else
        {
            return TypedResults.BadRequest("Failed to create the user.");
        }
    }

    public static int CreateCompanies(State state, string? company)
    {
        int getId;
        try
        {
            getId = (int)MySqlHelper.ExecuteScalar(state.DB, "SELECT id FROM Companies WHERE companyName = @companyName", [new("@companyName", company)]);
        }
        catch
        {
            getId = 0;
        }

        if (getId > 0)
        {
            return getId;
        }
        else
        {
            ulong result = (ulong)MySqlHelper.ExecuteScalar(state.DB, "INSERT INTO Companies (companyName, about) values (@companyName, @about); SELECT LAST_INSERT_ID();",
            new("@companyName", company),
            new("@about", null));

            int newProdID = Convert.ToInt32(result);

            if (newProdID > 0)
            {
                return newProdID;
            }
            else
            {
                return 0;
            }
        }
    }

}

/* {
    "username": "ivan",
    "password": "abc",
    "name": "ivanivan",
    "role": "seller",
    "creator": "ivansforetag"
} */