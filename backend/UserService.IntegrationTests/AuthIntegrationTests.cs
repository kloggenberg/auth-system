using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using UserService.API.DTOs;
using Xunit;

namespace UserService.IntegrationTests;

public class AuthIntegrationTests : IClassFixture<TestingWebAppFactory>
{
    private readonly HttpClient _client;

    public AuthIntegrationTests(TestingWebAppFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task User_Can_Register_Login_And_Get_Profile()
    {
        // 1️⃣ Arrange
        var uniqueEmail = $"success-{Guid.NewGuid()}@test.com";
        var register = new RegisterRequest
        {
            FirstName = "Test",
            LastName = "User",
            Email = uniqueEmail,
            Password = "Password123!"
        };

        // 2️⃣ Act - Register
        var registerResponse = await _client.PostAsJsonAsync("/api/auth/register", register);
        Assert.Equal(HttpStatusCode.OK, registerResponse.StatusCode);

        // 3️⃣ Act - Login
        var login = new LoginRequest { Email = uniqueEmail, Password = "Password123!" };
        var loginResponse = await _client.PostAsJsonAsync("/api/auth/login", login);
        Assert.Equal(HttpStatusCode.OK, loginResponse.StatusCode);

        var loginContent = await loginResponse.Content.ReadFromJsonAsync<JsonElement>();
        var token = loginContent.GetProperty("token").GetString();

        // 4️⃣ Act - Get Profile
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        var meResponse = await _client.GetAsync("/api/auth/me");
        
        // 5️⃣ Assert
        Assert.Equal(HttpStatusCode.OK, meResponse.StatusCode);
        var profile = await meResponse.Content.ReadFromJsonAsync<UserDetailsResponse>();
        Assert.NotNull(profile);
        Assert.Equal(uniqueEmail, profile.Email);
    }

    [Fact]
    public async Task Login_With_Wrong_Password_Returns_Unauthorized()
    {
        // Arrange
        var email = $"auth-fail-{Guid.NewGuid()}@test.com";
        await _client.PostAsJsonAsync("/api/auth/register", new RegisterRequest 
        { 
            Email = email, 
            Password = "CorrectPassword123!",
            FirstName = "Fail",
            LastName = "Test"
        });

        // Act
        var loginResponse = await _client.PostAsJsonAsync("/api/auth/login", new LoginRequest 
        { 
            Email = email, 
            Password = "WrongPassword!" 
        });

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, loginResponse.StatusCode);
    }

    [Fact]
    public async Task Register_Duplicate_Email_Returns_BadRequest()
    {
        // Arrange
        var email = $"dup-{Guid.NewGuid()}@test.com";
        var user = new RegisterRequest { Email = email, Password = "Password123!", FirstName = "User", LastName = "One" };

        // Act
        await _client.PostAsJsonAsync("/api/auth/register", user);
        var secondResponse = await _client.PostAsJsonAsync("/api/auth/register", user);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, secondResponse.StatusCode);
    }

    [Fact]
    public async Task Get_Me_Without_Token_Returns_Unauthorized()
    {
        // Arrange
        _client.DefaultRequestHeaders.Authorization = null;

        // Act
        var response = await _client.GetAsync("/api/auth/me");

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Get_Me_With_Malformed_Token_Returns_Unauthorized()
    {
        // Arrange
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "not-a-valid-token");

        // Act
        var response = await _client.GetAsync("/api/auth/me");

        // Assert
        // The JWT middleware will fail to validate this and return 401
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }
}