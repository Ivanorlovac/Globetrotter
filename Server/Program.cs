using Server;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/auctions", Auctions.All);
app.MapGet("/auctions/{auctionsId}", (string auctionsId) => Auctions.GetAuctionById(auctionsId));





app.Run();
