using MySql.Data.MySqlClient;
namespace Server;


public class Contacts
{
  public record Contact(int id, string name, string email, string tel, string message);

  public static bool AddNewContact(State state, Contact newContact)
  {
    try
    {
      MySqlCommand cmd = new("INSERT INTO Contact (name, email, tel, message) VALUES (@name, @email, @tel, @message)", state.DB);
      cmd.Parameters.AddWithValue("@name", newContact.name);
      cmd.Parameters.AddWithValue("@email", newContact.email);
      cmd.Parameters.AddWithValue("@tel", newContact.tel);
      cmd.Parameters.AddWithValue("@message", newContact.message);
      

      var affectedRows = cmd.ExecuteNonQuery();
      return affectedRows > 0;
    }

    catch (Exception ex)
    {
      Console.WriteLine($"An error occured: {ex.Message}");
      return false;
    }
  
  }
}