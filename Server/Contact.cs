using System.Security.Cryptography.X509Certificates;
using MySql.Data.MySqlClient;
namespace Server;


public class Contacts
{
  public record ContactEndpoint(string id, string surname, string email, string tel, string message);


  public record Contact(int id, string name, string email, string tel, string message);
  public static List<ContactEndpoint> GetAllContacts(State state)
  {
    List<ContactEndpoint> result = new();
    using var reader = MySqlHelper.ExecuteReader(state.DB, "SELECT * FROM Contacts");
    while (reader.Read())
    {
      result.Add(new(Convert.ToString(reader.GetInt32("id")), reader.GetString("name"), reader.GetString("email"), reader.GetString("tel"), reader.GetString("message")));
    }
    return result;
  }


  public static List<ContactEndpoint> GetContactById(int id, State state)
  {
    List<ContactEndpoint> result = new();
    using var reader = MySqlHelper.ExecuteReader(state.DB, "SELECT * FROM Contacts where id = @id", [new("@id", id)]);
    while (reader.Read())
    {
      result.Add(new(Convert.ToString(reader.GetInt32("id")), reader.GetString("name"), reader.GetString("email"), reader.GetString("tel"), reader.GetString("message")));
    }
    return result;
  }


  public static IResult DeleteContactById(int id, State state)
  {
    var deleted = MySqlHelper.ExecuteNonQuery(state.DB, "DELETE FROM Contacts WHERE id = @id", [new("@id", id)]);
    if (deleted > 0)
    {
      return TypedResults.Ok("Contact formula deleted successfully.");
    }
    else
    {
      return TypedResults.BadRequest("Failed to delete the contact formula.");
    }
  }
  public static IResult CreateContact(Contact newContact, State state)
  {
    var result = MySqlHelper.ExecuteNonQuery(state.DB, "INSERT INTO Contacts (name, email, tel, message) VALUES (@name, @email, @tel, @message)",
    [new("@name", newContact.name),
      new("email", newContact.email),
      new("tel", newContact.tel),
      new("message", newContact.message)]);


    if (result == 1)
    {
      return TypedResults.Created($"/contact/{result}", new { id = result, newContact.name, newContact.email, newContact.tel, newContact.message });
    }
    else


      return TypedResults.BadRequest("Failed to create new contact formula.");
  }


}
