using Microsoft.EntityFrameworkCore;
using UserService.API.Controllers;
using UserService.API.Data;
using UserService.API.Models;
using UserService.API.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Xunit;
using Microsoft.AspNetCore.Mvc;

public class AuthControllerTests
{
    private AppDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "AuthTestDb")
            .Options;

        return new AppDbContext(options);
    }

    private AuthController CreateController(AppDbContext context)
    {
        var hasher = new PasswordHasher<User>();

        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                { "Jwt:Key", "super-secret-key-super-secret-key" },
                { "Jwt:Issuer", "auth-system" },
                { "Jwt:Audience", "auth-system" }
            })
            .Build();

        return new AuthController(context, hasher, configuration);
    }

    [Fact]
    public async Task Register_Should_Create_User()
    {
        var context = CreateContext();
        var controller = CreateController(context);

        var request = new RegisterRequest
        {
            FirstName = "Test",
            LastName = "User",
            Email = "test@gmail.com",
            Password = "Password123!"
        };

        await controller.Register(request);

        var user = await context.Users.FirstOrDefaultAsync();
        Assert.NotNull(user);
        Assert.Equal("test@gmail.com", user.Email);
    }

    [Fact]
    public async Task Login_Should_Return_Token_When_Credentials_Are_Valid()
    {
        var context = CreateContext();

        var hasher = new PasswordHasher<User>();
        var user = new User
        {
            FirstName = "Test",
            LastName = "User",
            Email = "login@gmail.com"
        };
        user.PasswordHash = hasher.HashPassword(user, "Password123!");

        context.Users.Add(user);
        await context.SaveChangesAsync();

        var controller = CreateController(context);

        var request = new LoginRequest
        {
            Email = "login@gmail.com",
            Password = "Password123!"
        };

        var result = await controller.Login(request);

        var ok = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(ok.Value);
    }

    [Fact]
    public async Task Register_Should_Not_Allow_Duplicate_Email()
    {
        var context = CreateContext();
        var controller = CreateController(context);

        var request = new RegisterRequest
        {
            FirstName = "Test",
            LastName = "User",
            Email = "duplicate@gmail.com",
            Password = "Password123!"
        };

        await controller.Register(request);

        var duplicate = await controller.Register(request);

        Assert.IsType<BadRequestObjectResult>(duplicate);
    }
}