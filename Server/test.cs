namespace Server;
using MySql.Data.MySqlClient;

public class Boxes
{
    public record HomepageBox(int ID, string Title, string Image);
    public record ActionsBox(int ID, string Title, string Image);
    public record AuctionBox(string Title);


    public static List<HomepageBox> Homepage(State state)
    {
        List<HomepageBox> result = new();
        MySqlCommand cmd = new("select id, title, image from boxes where ending > now() order by ending limit 20", state.DB);
        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            result.Add(new(reader.GetInt32("id"), reader.GetString("title"), reader.GetString("image")));
        }

        return result;
    }
    public static AuctionBox? AuctionPage(string id, State state)
    {
        MySqlCommand cmd = new("select title, image from boxes where id = @id", state.DB);
        cmd.Parameters.AddWithValue("@id", id);
        using var reader = cmd.ExecuteReader();
        bool found = reader.Read();
        if (found)
        {
            return new(reader.GetString("title"));
        }
        else
        {
            return null;
        }

    }

}