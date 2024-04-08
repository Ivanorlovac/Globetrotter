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
app.MapDelete("/users/{id}", (int id, State state) =>
{
  if (Users.DeleteUser(state, id))
  {
    return Results.Ok("User deleted successfully.");
  }
  else
  {
    return Results.BadRequest("Failed to delete the user.");
  }
});
app.MapPut("/users/{id}", (int id, State state, Users.User user) =>
{
  user = user with { id = id };
  if (Users.UpdateUser(state, user))
  {
    return Results.Ok("User updated successfully.");
  }
  else
  {
    return Results.BadRequest("Failed to update the user.");
  }
});
app.MapPost("/users", async (State state, Users.User user) =>
{
  
  if (string.IsNullOrWhiteSpace(user.username))
  {
    return Results.BadRequest("Username is required.");
  }
 
  
  

  var success = await Users.CreateUserAsync(state, user); 
  if (success)
  {
    
    return Results.Created($"/users/{user.id}", new { user.id, user.username, user.password, user.role, user.name, user.company });
  }
  else
  {
    return Results.BadRequest("Failed to create the user.");
  }
});


app.Run();
public record State(MySqlConnection DB);

