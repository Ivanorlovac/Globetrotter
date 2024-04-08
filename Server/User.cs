using MySql.Data.MySqlClient;
namespace Server;



public class Users
{
    public record User(int id, string username, string password, string role, string name, int? company);
    public static List<User> GetAllUsers(State state)
    {
        List<User> result = new();
        MySqlCommand cmd = new("select * from Users", state.DB);
        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            if (reader.GetString("role") == "seller")
            {
                result.Add(new(reader.GetInt32("id"), reader.GetString("username"), reader.GetString("password"), reader.GetString("role"), reader.GetString("name"), reader.GetInt32("company")));
            } else
            {
                result.Add(new(reader.GetInt32("id"), reader.GetString("username"), reader.GetString("password"), reader.GetString("role"), reader.GetString("name"),null));
            }
            
        }

        return result;
    }

    public static List<User> GetAllUsersById(State state, string id)
    {
        List<User> result = new();
        MySqlCommand cmd = new("select * from Users where id = @id", state.DB);
        cmd.Parameters.AddWithValue("@id", id);

        using var reader = cmd.ExecuteReader();
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

    public static bool DeleteUser(State state, int id)
    {
        try
        {
            using var cmd = new MySqlCommand("delete from Users where id = @id", state.DB);
            cmd.Parameters.AddWithValue("@id", id);
            var affectedRows = cmd.ExecuteNonQuery();
            return affectedRows > 0;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return false;
        }
    }

    public static bool UpdateUser(State state, User user)
    {
        try
        {
            using var cmd = new MySqlCommand("update Users set username = @username, password = @password, role = @role, name= @name, company= @company where id = @id", state.DB);
            cmd.Parameters.AddWithValue("@id", user.id);
            cmd.Parameters.AddWithValue("@username", user.username);
            cmd.Parameters.AddWithValue("@password", user.password);
            cmd.Parameters.AddWithValue("@role", user.role);
            cmd.Parameters.AddWithValue("@name", user.name);
            cmd.Parameters.AddWithValue("@company", user.company);
            var affectedRows = cmd.ExecuteNonQuery();
            return affectedRows > 0;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
            return false;
        }
    }

  public static async Task<bool> CreateUserAsync(State state, User user)
  {
    try
    {
   

      using var cmd = new MySqlCommand("INSERT INTO Users (username, password, role, name, company) VALUES (@username, @password, @role, @name, @company)", state.DB);
      cmd.Parameters.AddWithValue("@username", user.username);
      cmd.Parameters.AddWithValue("@password", user.password); // Use the hashed password
      cmd.Parameters.AddWithValue("@role", user.role);
      cmd.Parameters.AddWithValue("@name", user.name);
      cmd.Parameters.AddWithValue("@company", user.company);

      if (state.DB.State != System.Data.ConnectionState.Open)
        await state.DB.OpenAsync();

      var affectedRows = await cmd.ExecuteNonQueryAsync();
      return affectedRows > 0;
    }
    catch (Exception ex)
    {
      Console.WriteLine($"An error occurred: {ex.Message}");
      return false;
    }
  }

}

            

