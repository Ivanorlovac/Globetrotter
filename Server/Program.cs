using Server;
using App.TimerHostedService;
using Microsoft.Extensions.FileProviders;

State state = new State("server=127.0.0.1 ;uid=root;pwd=mypassword;database=Globetrotter;port=3306");

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication().AddCookie("globetrotter");
builder.Services.AddAuthorizationBuilder().AddPolicy("seller", policy => policy.RequireRole("seller")).AddPolicy("buyer", policy => policy.RequireRole("buyer"));
builder.Services.AddSingleton(state);
builder.Services.AddHostedService<TimerService>();

builder.WebHost.ConfigureKestrel(serverOptions =>
{
  serverOptions.ListenAnyIP(3000);
});

var app = builder.Build();

app.MapGet("/auctions", Auctions.GetAllAuctions);
app.MapGet("/auctions/{Id}", Auctions.GetAllAuctionById);
app.MapGet("/auctions/seller/{companyName}", Auctions.GetAllAuctionByName);
app.MapDelete("/auctions/{id}", Auctions.DeleteAuction);
app.MapPut("/auctions/{id}", Auctions.UpdateAuction);
app.MapPost("/auctions", Auctions.CreateAuction);

app.MapGet("/bids", Bids.GetAllBids);
app.MapGet("/bids/user/{user}", Bids.GetAllBidsUser).RequireAuthorization("buyer");
app.MapGet("/bids/auction/{auction}", Bids.GetAllBidsAuction);
app.MapGet("/bids/auction/{auction}/user/{user}", Bids.GetAllBidsUserAuction);
app.MapPost("/bids", Bids.CreateBid).RequireAuthorization("buyer");

app.MapGet("/favorites/{user}", Favorites.GetAllFavoritesUser).RequireAuthorization("buyer");
app.MapDelete("/favorites/{userId}/{auctionId}", Favorites.RemoveOneFavoriteFromDatabase).RequireAuthorization("buyer");
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


//----------------------------------------------------------------------------------
var distPath = Path.Combine(app.Environment.ContentRootPath, "dist");
var fileProvider = new PhysicalFileProvider(distPath);

app.UseHttpsRedirection();

app.UseDefaultFiles(new DefaultFilesOptions
{
  FileProvider = fileProvider,
  DefaultFileNames = new List<string> { "index.html" }
});

app.UseStaticFiles(new StaticFileOptions
{
  FileProvider = fileProvider,
  RequestPath = ""
});

app.UseRouting();

app.MapFallback(async context =>
{
  context.Response.ContentType = "text/html";
  await context.Response.SendFileAsync(Path.Combine(distPath, "index.html"));
});
//----------------------------------------------------------------------------------

app.Run("http://localhost:3000"); 
public record State(string DB);

