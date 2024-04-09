using Server;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Mvc;
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
app.MapDelete("/auctions/{id}", Auctions.DeleteAuction);
app.MapPut("/auctions/{id}",  Auctions.UpdateAuction);
app.MapPost("/auctions", Auctions.CreateAuction);

app.MapGet("/bids", Bids.GetAllBids);
app.MapGet("/bids/user/{user}", Bids.GetAllBidsUser);
app.MapGet("/bids/auction/{auction}", Bids.GetAllBidsAuction);
app.MapGet("/bids/auction/{auction}/user/{user}", Bids.GetAllBidsUserAuction);
app.MapPost("/bids", (State state, Bids.Bid newBid) =>
{
  var success = Bids.CreateBid(state, newBid);
  if (success)
  {
    return Results.Created($"/bids/{newBid.id}", newBid);
  }
  else
  {
    return Results.BadRequest("Failed to create the bid.");
  }
});



app.MapGet("/favorites", Favorites.GetAllFavorites);
app.MapGet("/favorites/{user}", Favorites.GetAllFavoritesUser);
app.MapDelete("/favorites/{favoriteId}", (int favoriteId, State state) =>
{
  if (Favorites.RemoveOneFavoriteFromDatabase(state, favoriteId))
  {
    return Results.Ok("Favorite removed successfully.");
  }
  else
  {
    return Results.BadRequest("Failed to remove favorite.");
  }
});
app.MapPost("/favorites", (State state, Favorites.Favorite NewFavorite) =>
{
  var success = Favorites.AddNewFavorite(state, NewFavorite);
  if (success)
  {
    return Results.Created($"/favorites/{NewFavorite.id}", NewFavorite);
  }
  else
  {
    return Results.BadRequest("Failed to create the auction.");
  }
});

app.MapGet("/users", Users.GetAllUsers);
app.MapGet("/users/{id}", Users.GetAllUsersById);
app.MapDelete("/users/{id}",Users.DeleteUser);
app.MapPut("/users/{id}", Users.UpdateUser);
app.MapPost("/users", Users.CreateUser);
 


app.Run();
public record State(MySqlConnection DB);

