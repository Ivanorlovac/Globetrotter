using MySql.Data.MySqlClient;
using Server;


State state = new State(new("server=localhost;uid=root;pwd=mypassword;database=Globetrotter;port=3306"));

try
{
  state.DB.Open();
}
catch(Exception e)
{
  Console.WriteLine(e);
  throw;
}



var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication().AddCookie("globetrotter");
builder.Services.AddAuthorizationBuilder().AddPolicy("admin_route", policy => policy.RequireRole("admin"));
builder.Services.AddSingleton(state);
var app = builder.Build();

app.MapGet("/contact", Contacts.GetAllContacts);
app.MapGet("/contact/{id}", Contacts.GetContactById);
app.MapDelete("/contact/{id}", Contacts.DeleteContactById);
app.MapPost("/contact", Contacts.CreateContact);

app.Run();
public record State (MySqlConnection DB);