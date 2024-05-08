using Server;
using App.TimerHostedService;
using Microsoft.Extensions.FileProviders;

State state = new State("server=127.0.0.1;uid=root;pwd=mypassword;database=Globetrotter;port=3306");

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
var routes = app.MapGroup("/api"); 

routes.MapGet("/auctions", Auctions.GetAllAuctions);
routes.MapGet("/auctions/{Id}", Auctions.GetAllAuctionById);
routes.MapGet("/auctions/seller/{companyName}", Auctions.GetAllAuctionByName);
routes.MapDelete("/auctions/{id}", Auctions.DeleteAuction);
routes.MapPut("/auctions/{id}", Auctions.UpdateAuction);
routes.MapPost("/auctions", Auctions.CreateAuction);

routes.MapGet("/bids", Bids.GetAllBids);
routes.MapGet("/bids/user/{user}", Bids.GetAllBidsUser).RequireAuthorization("buyer");
routes.MapGet("/bids/auction/{auction}", Bids.GetAllBidsAuction);
routes.MapGet("/bids/auction/{auction}/user/{user}", Bids.GetAllBidsUserAuction);
routes.MapPost("/bids", Bids.CreateBid).RequireAuthorization("buyer");

routes.MapGet("/favorites/{user}", Favorites.GetAllFavoritesUser).RequireAuthorization("buyer");
routes.MapDelete("/favorites/{userId}/{auctionId}", Favorites.RemoveOneFavoriteFromDatabase).RequireAuthorization("buyer");
routes.MapPost("/favorites", Favorites.AddNewFavorite).RequireAuthorization("buyer");

routes.MapPost("/login", Auth.Login);
routes.MapDelete("/login", Auth.Logout);

routes.MapGet("/users", Users.GetAllUsers);
routes.MapGet("/users/{id}", Users.GetAllUsersById);
routes.MapDelete("/users/{id}", Users.DeleteUser);
routes.MapPut("/users/{id}", Users.UpdateUser);
routes.MapPost("/users", Users.CreateUser);

routes.MapGet("/closed-auctions", ClosedAuctions.GetAllClosedAuctions);

routes.MapGet("/contact", Contacts.GetAllContacts);
routes.MapGet("/contact/{id}", Contacts.GetContactById);
routes.MapDelete("/contact/{id}", Contacts.DeleteContactById);
routes.MapPost("/contact", Contacts.CreateContact);


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
   string? path = context.Request.Path.Value;      
   if (!path.StartsWith("/api/auctions/") || !path.StartsWith("/api/bids/") || !path.StartsWith("/api/favorites/") || !path.StartsWith("/api/login/") || !path.StartsWith("/api/users/") || !path.StartsWith("/api/closed-auctions/") || !path.StartsWith("/api/contact/"))
  {         
    context.Response.ContentType = "text/html";
    await context.Response.SendFileAsync(Path.Combine(distPath, "index.html"));     
    } 
});

app.Run(); 
public record State(string DB);

