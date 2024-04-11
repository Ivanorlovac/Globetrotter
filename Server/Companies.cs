using MySql.Data.MySqlClient;
namespace Server;

    public class Companies
    {
    public record Company(string companyName, string logo, string about);
    public static IResult CreateCompanies(State state, Company company)
    {
        var result = MySqlHelper.ExecuteScalar(state.DB, "insert into Companies (companyName, logo, about) values (@companyName, @logo, @about) returning id",
        new("@companyName", company.companyName),
        new("@logo", company.logo),
        new("@about", company.about));

        if (result != null)
        {
            using var reader = MySqlHelper.ExecuteReader(state.DB, "SELECT id FROM Companies WHERE companyName = @companyName", [new("@companyName", company.companyName)]);

            while (reader.Read())
            {
                var getId = reader.GetInt32("id");
                return TypedResults.Ok(getId);
            }
            return TypedResults.BadRequest("Failed to find the id.");
        }
        else
        {
            return TypedResults.BadRequest("Failed to create the company.");
        }
    }
}
