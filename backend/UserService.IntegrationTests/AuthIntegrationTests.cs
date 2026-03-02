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
        var uniqueEmail = $"success-{Guid.NewGuid()}@gmail.com";
        var register = new RegisterRequest
        {
            FirstName = "Test",
            LastName = "User",
            Email = uniqueEmail,
            Password = "Password123!"
        };

        var registerResponse = await _client.PostAsJsonAsync("/api/auth/register", register);
        Assert.Equal(HttpStatusCode.OK, registerResponse.StatusCode);

        var login = new LoginRequest { Email = uniqueEmail, Password = "Password123!" };
        var loginResponse = await _client.PostAsJsonAsync("/api/auth/login", login);
        Assert.Equal(HttpStatusCode.OK, loginResponse.StatusCode);

        var loginContent = await loginResponse.Content.ReadFromJsonAsync<JsonElement>();
        var token = loginContent.GetProperty("token").GetString();

        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        var meResponse = await _client.GetAsync("/api/auth/me");
        
        Assert.Equal(HttpStatusCode.OK, meResponse.StatusCode);
        var profile = await meResponse.Content.ReadFromJsonAsync<UserDetailsResponse>();
        Assert.NotNull(profile);
        Assert.Equal(uniqueEmail, profile.Email);
    }

    [Fact]
    public async Task Login_With_Wrong_Password_Returns_Unauthorized()
    {

        var email = $"auth-fail-{Guid.NewGuid()}@gmail.com";
        await _client.PostAsJsonAsync("/api/auth/register", new RegisterRequest 
        { 
            Email = email, 
            Password = "CorrectPassword123!",
            FirstName = "Fail",
            LastName = "Test"
        });

        var loginResponse = await _client.PostAsJsonAsync("/api/auth/login", new LoginRequest 
        { 
            Email = email, 
            Password = "WrongPassword!" 
        });

        Assert.Equal(HttpStatusCode.Unauthorized, loginResponse.StatusCode);
    }

    [Fact]
    public async Task Register_Duplicate_Email_Returns_BadRequest()
    {
        var email = $"dup-{Guid.NewGuid()}@gmail.com";
        var user = new RegisterRequest { Email = email, Password = "Password123!", FirstName = "User", LastName = "One" };

        await _client.PostAsJsonAsync("/api/auth/register", user);
        var secondResponse = await _client.PostAsJsonAsync("/api/auth/register", user);

        Assert.Equal(HttpStatusCode.BadRequest, secondResponse.StatusCode);
    }

    [Fact]
    public async Task Get_Me_Without_Token_Returns_Unauthorized()
    {
        _client.DefaultRequestHeaders.Authorization = null;

        var response = await _client.GetAsync("/api/auth/me");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Get_Me_With_Malformed_Token_Returns_Unauthorized()
    {
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "not-a-valid-token");

        var response = await _client.GetAsync("/api/auth/me");

        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }
}