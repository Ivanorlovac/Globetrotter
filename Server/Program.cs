using Server;
using App.TimerHostedService;

State state = new State("server=localhost;uid=root;pwd=Dunder123!1;database=Globetrotter;port=3306");

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication().AddCookie("globetrotter");
builder.Services.AddAuthorizationBuilder().AddPolicy("seller", policy => policy.RequireRole("seller")).AddPolicy("buyer", policy => policy.RequireRole("buyer"));
builder.Services.AddSingleton(state);
builder.Services.AddHostedService<TimerService>();

var allowedOrigin = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
  options.AddPolicy("myAppCors", policy =>
  {
    policy.WithOrigins(allowedOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod();
  });
});

var app = builder.Build();

app.MapGet("/auctions", Auctions.GetAllAuctions);
app.MapGet("/auctions/{Id}", Auctions.GetAllAuctionById);
app.MapDelete("/auctions/{id}", Auctions.DeleteAuction);
app.MapPut("/auctions/{id}", Auctions.UpdateAuction);
app.MapPost("/auctions", Auctions.CreateAuction);

app.MapGet("/bids", Bids.GetAllBids);
app.MapGet("/bids/user/{user}", Bids.GetAllBidsUser).RequireAuthorization("buyer");
app.MapGet("/bids/auction/{auction}", Bids.GetAllBidsAuction);
app.MapGet("/bids/auction/{auction}/user/{user}", Bids.GetAllBidsUserAuction);
app.MapPost("/bids", Bids.CreateBid).RequireAuthorization("buyer");

app.MapGet("/favorites/{user}", Favorites.GetAllFavoritesUser).RequireAuthorization("buyer");
app.MapDelete("/favorites/{FavoriteId}", Favorites.RemoveOneFavoriteFromDatabase).RequireAuthorization("buyer");
app.MapPost("/favorites", Favorites.AddNewFavorite).RequireAuthorization("buyer");

app.MapPost("/login", Auth.Login);
app.MapDelete("/login", Auth.Logout);

app.MapGet("/users", Users.GetAllUsers);
app.MapGet("/users/{id}", Users.GetAllUsersById);
app.MapDelete("/users/{id}", Users.DeleteUser);
app.MapPut("/users/{id}", Users.UpdateUser);
app.MapPost("/users", Users.CreateUser);

app.MapGet("/closed-auctions", ClosedAuctions.GetAllClosedAuctions);

app.MapGet("/contact", Contacts.GetAllContacts);
app.MapGet("/contact/{id}", Contacts.GetContactById);
app.MapDelete("/contact/{id}", Contacts.DeleteContactById);
app.MapPost("/contact", Contacts.CreateContact);

app.UseCors("myAppCors");
app.Run("http://localhost:3000");
public record State(string DB);

