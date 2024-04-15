using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;
using Server;
using MySql.Data.MySqlClient;

namespace App.TimerHostedService;

public sealed class TimerService : IHostedService, IAsyncDisposable
{
    private readonly ILogger<TimerService> _logger;
    private readonly State _state = new State(new ("server=localhost;uid=root;pwd=mypassword;database=Globetrotter;port=3306"));
    private readonly State _state1 = new State(new("server=localhost;uid=root;pwd=mypassword;database=Globetrotter;port=3306"));

    private readonly Task _completedTask = Task.CompletedTask;
    private Timer? _timer;
    public record ClosedAuction(int? auctionId = null, int? userId = null, int? amount = null);

    public record State(MySqlConnection DB);

    public TimerService(ILogger<TimerService> logger)
    {
        _logger = logger;
    }

    public Task StartAsync(CancellationToken stoppingToken)
    {
        try
        {
            _state.DB.Open();
            _state1.DB.Open();

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }

        _logger.LogInformation("{Service} is running.", nameof(TimerService));
        _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(2));

        return _completedTask;
    }

    private void DoWork(object? state)
    {
        string setTimezoneQuery = "SET time_zone='Europe/Stockholm';";
        using (var timezoneCmd = new MySqlCommand(setTimezoneQuery, _state.DB))
        {
            timezoneCmd.ExecuteNonQuery();
        }
        
        string query = @"SELECT a.id AS auctionId, a.endTime, a.valuationPrice, a.priceRange, b.id AS bidId, maxBid.highestBid, b.userId FROM Auctions a
                            LEFT JOIN (
                                SELECT
                                    auctionId,
                                    MAX(amount) AS highestBid
                                FROM
                                    Bids
                                GROUP BY
                                    auctionId
                            ) maxBid ON a.id = maxBid.auctionId
                            LEFT JOIN Bids b ON a.id = b.auctionId AND b.amount = maxBid.highestBid
                            LEFT JOIN ClosedAuctions ca ON a.id = ca.auctionId
                            WHERE
                            a.endTime < NOW()
                            AND ca.auctionId IS NULL;";

        MySqlCommand cmd = new(query, _state.DB);
        using var reader = cmd.ExecuteReader();         
        while (reader.Read())
        {
            Console.WriteLine("auctionId: " + reader.GetInt32("auctionId") + " have expired");
            try
            {
                if (reader.GetInt32("valuationPrice") - reader.GetInt32("priceRange") < reader.GetInt32("highestBid"))
                {
                    Console.WriteLine("ID: " + reader.GetInt32("auctionId") + " Bud: " + reader.GetInt32("highestBid"));
                    CreateClosedAuction(new ClosedAuction(reader.GetInt32("auctionId"), reader.GetInt32("userId"), reader.GetInt32("highestBid")));
                }
                else
                {
                    Console.WriteLine("ID: " + reader.GetInt32("auctionId") + " Bud: " + reader.GetInt32("highestBid") + " did not meet the auction's requirements.");
                    CreateClosedAuction(new ClosedAuction(reader.GetInt32("auctionId"), null, null));
                }
            }
            catch
            {
                Console.WriteLine("Auction id: " + reader.GetInt32("auctionId") + " have no bids");
                CreateClosedAuction(new ClosedAuction(reader.GetInt32("auctionId"), null, null));
            }
        }
    }
    public void CreateClosedAuction(ClosedAuction newClosedAuction)
    {
        try
        {

            using var cmd = new MySqlCommand("insert into ClosedAuctions (auctionId, winner, amount) values (@auctionId, @winner, @amount)", _state1.DB);
            cmd.Parameters.AddWithValue("@auctionId", newClosedAuction.auctionId);
            cmd.Parameters.AddWithValue("@winner", newClosedAuction.userId);
            cmd.Parameters.AddWithValue("@amount", newClosedAuction.amount);
            cmd.ExecuteNonQuery();
            Console.WriteLine("Auction " + newClosedAuction.auctionId + " have successfully been moved to ClosedAuctions"); 
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }

    public Task StopAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("{Service} is stopping.", nameof(TimerService));

        _timer?.Change(Timeout.Infinite, 0);

        return _completedTask;
    }

    public async ValueTask DisposeAsync()
    {
        if (_timer is IAsyncDisposable timer)
        {
            await timer.DisposeAsync();
        }

        _timer = null;
    }
}
