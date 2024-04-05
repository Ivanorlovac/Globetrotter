using Server;
using MySql.Data.MySqlClient;
using ServerFavorites;



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
app.MapDelete("/auctions/{id}",  (int id, State state) =>
{
  if (Auctions.DeleteAuction(state, id))
  {
    return Results.Ok("Auction deleted successfully.");
  }
  else
  {
    return Results.BadRequest("Failed to delete the auction.");
  }
});
app.MapPut("/auctions/{id}",  (int id, State state, Auctions.Auction auction) =>
{
  auction = auction with { id = id }; 
  if (Auctions.UpdateAuction(state, auction))
  {
    return Results.Ok("Auction updated successfully.");
  }
  else
  {
    return Results.BadRequest("Failed to update the auction.");
  }
});
app.MapPost("/auctions", (State state, Auctions.Auction newAuction) =>
{
  var success = Auctions.CreateAuction(state, newAuction);
  if (success)
  {
    return Results.Created($"/auctions/{newAuction.id}", newAuction);
  }
  else
  {
    return Results.BadRequest("Failed to create the auction.");
  }
});






app.MapGet("/bids", Bids.GetAllBids);
app.MapGet("/bids/{user}", Bids.GetAllBidsUser);

app.MapGet("/favorites", Favorites.GetAllFavorites);
app.MapGet("/favorites/{user}", Favorites.GetAllFavoritesUser);

app.Run();
public record State(MySqlConnection DB);