using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using UserService.API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
namespace UserService.IntegrationTests;

public class TestingWebAppFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            var descriptor = services.SingleOrDefault(
                d => d.ServiceType == typeof(DbContextOptions<AppDbContext>));
            if (descriptor != null) services.Remove(descriptor);

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseInMemoryDatabase("TestDatabase");
            });
        });

        builder.UseSetting("Jwt:Key", "YourFallbackKeyForDevelopmentOnly123!");
    }
}