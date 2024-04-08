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
    private readonly State _state;
    private readonly Task _completedTask = Task.CompletedTask;
    private Timer? _timer;
    public record ClosedAuction(int auctionId, int userId, int amount);


    public TimerService(ILogger<TimerService> logger, State state)
    {
        _logger = logger;
        _state = state;
    }

    public Task StartAsync(CancellationToken stoppingToken)
    {
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
        string query = @"SELECT a.id AS auctionId, a.endTime, b.id AS bidId, b.amount AS maxAmount, b.userId FROM Auctions a
                            LEFT JOIN ClosedAuctions ca ON a.id = ca.auctionId
                            LEFT JOIN Bids b ON a.id = b.auctionId
                            INNER JOIN (
                                SELECT
                                    auctionId,
                                    MAX(amount) AS maxAmount
                                FROM
                                    Bids
                                GROUP BY
                                    auctionId
                            ) mb ON b.auctionId = mb.auctionId AND b.amount = mb.maxAmount
                        WHERE
                            a.endTime < Now()
                            AND ca.auctionId IS NULL
                        GROUP BY
                            a.id, b.id, b.amount, b.userId;";

        MySqlCommand cmd = new(query, _state.DB);
        using var reader = cmd.ExecuteReader();
        //Console.WriteLine("Time now: " + DateTime.Now);
        while (reader.Read())
        {
            Console.WriteLine("auctionId: " + reader.GetInt32("auctionId") + " have expired");
            CreateClosedAuction(new ClosedAuction(reader.GetInt32("auctionId"), reader.GetInt32("userId"), reader.GetInt32("maxAmount")));
        }

    }
    public void CreateClosedAuction(ClosedAuction newClosedAuction)
    {
        try
        {
            using var connection = new MySqlConnection("server=localhost;uid=root;pwd=Dunder123!1;database=Globetrotter;port=3306");
            connection.Open();

            using var cmd = new MySqlCommand("insert into ClosedAuctions (auctionId, winner, amount) values (@auctionId, @winner, @amount)", connection);
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
