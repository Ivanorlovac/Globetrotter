using MySql.Data.MySqlClient;
using Mysqlx.Crud;
namespace Server;


public class Contacts
{
  public record Contact(int id, string name, string email, string tel, string message);

  public static List<Contact> GetAllContacts(State state)
  {
    List<Contact> result = new();
    MySqlCommand cmd = new("SELECT * from Contacts", state.DB);
    using var reader = cmd.ExecuteReader();
    while (reader.Read())
    {
      result.Add(new(reader.GetInt32("id"),reader.GetString("name"),reader.GetString("email"),reader.GetString("tel"),reader.GetString("message")));

    }

    return result;
  }


  public static bool DeleteContact(State state, int id)
  {
    try
    {
      MySqlCommand cmd = new("Delete FROM Contacts WHERE id = @id", state.DB);
      cmd.Parameters.AddWithValue("@id", id);

      var affectedRows = cmd.ExecuteNonQuery();
      return affectedRows > 0;
    }
    catch (Exception ex)
    {
      Console.WriteLine($"An error occured: {ex.Message}");
      return false;
    }
  }

  public static bool AddNewContact(State state, Contact newContact)
  {
    try
    {
      MySqlCommand cmd = new("INSERT INTO Contacts (name, email, tel, message) VALUES (@name, @email, @tel, @message)", state.DB);
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