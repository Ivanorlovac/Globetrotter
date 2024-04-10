using MySql.Data.MySqlClient;


namespace Server;


using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;


public class Auth
{
    public record LoginData(string Username, string Password);


    public static async Task<IResult> Login(LoginData user, State state, HttpContext ctx)
    {
        var reader = MySqlHelper.ExecuteReader(state.DB, "select id, role from Users where username = @Username and password = @Password", [new("@Username", user.Username), new("@Password", user.Password)]);


        bool bIsFound = reader.Read();


        if (!bIsFound)
        {
            return TypedResults.Problem("No Such User Exists");
        }


        string id = reader.GetInt32("id").ToString();
        string role = reader.GetString("role");


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
        return TypedResults.Ok("Signed in");
    }

    public static async Task Logout(HttpContext ctx)
    {
        await ctx.SignOutAsync();
    }

}
