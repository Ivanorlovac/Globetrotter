using MySql.Data.MySqlClient;


namespace Server;


using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;


public class Auth
{
    public record LoginData(string Username, string Password);

    public record User(string id, string username, string password, string role, string? creator = null, string? creatorImage = null);
    public static async Task<IResult>  Login(LoginData user, State state, HttpContext ctx)
    {
        var reader = MySqlHelper.ExecuteReader(state.DB, @"SELECT u.id, u.username, u.password, u.role, u.name, c.companyName, c.logo FROM Users as u
                                                            LEFT JOIN Companies c ON u.company = c.id where username = @Username and password = @Password", [new("@Username", user.Username), new("@Password", user.Password)]);


        bool bIsFound = reader.Read();

        if (!bIsFound)
        {
            return TypedResults.Problem("No Such User Exists");
        }


        string id = Convert.ToString(reader.GetInt32("id"));
        string role = reader.GetString("role");
        string username = reader.GetString("username");
        string password = reader.GetString("password");

        User userResult;
        if (role == "seller"){
            string creator = reader.GetString("companyName");
            string creatorImage = reader.GetString("logo");
            userResult = new User(id, username, password, role, creator, creatorImage);
        }
        else
        {
            userResult = new User(id, username, password, role, null, null);
        }

        Console.WriteLine(id + ", " + role);


        await ctx.SignInAsync("globetrotter", new ClaimsPrincipal(
            new ClaimsIdentity(
                new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, id),
                    new Claim(ClaimTypes.Role, role),
                },
                "globetrotter"
            )
        ));
        return TypedResults.Ok(userResult);
    }

    public static async Task Logout(HttpContext ctx)
    {
        await ctx.SignOutAsync();
    }

}
