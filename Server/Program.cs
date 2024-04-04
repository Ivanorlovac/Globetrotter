using Server;
using MySql.Data.MySqlClient;

State state = new State(new("server=localhost;uid=root;pwd=mypassword;database=Globetrotter;port=3306"));

try
{
  state.DB.Open();
}
catch (Exception e)
{
  Console.WriteLine(e);
  throw;
}

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication().AddCookie("opa23.teachers.foodcourt");
builder.Services.AddAuthorizationBuilder().AddPolicy("admin_route", policy => policy.RequireRole("admin"));
builder.Services.AddSingleton(state);
var app = builder.Build();

app.MapGet("/auctions", Auctions.GetAllAuctions);
app.MapGet("/auctions/{Id}", Auctions.GetAllAuctionById);






app.MapGet("/bids", Bids.GetAllBids);
app.MapGet("/bids/{user}", Bids.GetAllBidsUser);

app.Run();
public record State(MySqlConnection DB);