using Server;
using MySql.Data.MySqlClient;
using App.TimerHostedService;
using Org.BouncyCastle.Crypto.Prng;
using MySqlX.XDevAPI.Common;

State state = new State("server=localhost;uid=root;pwd=mypassword;database=Globetrotter;port=3306");

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication().AddCookie("globetrotter");
builder.Services.AddAuthorizationBuilder().AddPolicy("seller", policy => policy.RequireRole("seller")).AddPolicy("buyer", policy => policy.RequireRole("buyer"));
builder.Services.AddSingleton(state);
builder.Services.AddHostedService<TimerService>();

var app = builder.Build();

app.MapGet("/auctions", Auctions.GetAllAuctions);
app.MapGet("/auctions/{Id}", Auctions.GetAllAuctionById);
app.MapDelete("/auctions/{id}", Auctions.DeleteAuction);
app.MapPut("/auctions/{id}", Auctions.UpdateAuction);
app.MapPost("/auctions", Auctions.CreateAuction);

app.MapGet("/bids", Bids.GetAllBids);
app.MapGet("/bids/user/{user}", Bids.GetAllBidsUser).RequireAuthorization("buyer");
app.MapGet("/bids/auction/{auction}", Bids.GetAllBidsAuction);
app.MapGet("/bids/auction/{auction}/user/{user}", Bids.GetAllBidsUserAuction).RequireAuthorization("buyer");
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

app.Run();
public record State(string DB);

