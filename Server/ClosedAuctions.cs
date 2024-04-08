
namespace Server;
using MySql.Data.MySqlClient;

public class ClosedAuctions
{
    public record ClosedAuction(int id, int auctionId, int winner, int amount);

}
