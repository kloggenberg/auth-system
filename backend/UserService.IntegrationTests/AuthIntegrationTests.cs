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
        var uniqueEmail = $"test-{Guid.NewGuid()}@test.com";
        var register = new RegisterRequest
        {
            FirstName = "Test",
            LastName = "User",
            Email = uniqueEmail,
            Password = "Password123!"
        };

        var registerResponse = await _client.PostAsJsonAsync("/api/auth/register", register);
        Assert.Equal(HttpStatusCode.OK, registerResponse.StatusCode);

        var login = new LoginRequest
        {
            Email = uniqueEmail,
            Password = "Password123!"
        };

        var loginResponse = await _client.PostAsJsonAsync("/api/auth/login", login);
        Assert.Equal(HttpStatusCode.OK, loginResponse.StatusCode);

        var loginContent = await loginResponse.Content.ReadFromJsonAsync<JsonElement>();
        var token = loginContent.TryGetProperty("token", out var tokenProp) ? tokenProp.GetString() : null;

        Assert.NotNull(token);
        Assert.NotEmpty(token);

        _client.DefaultRequestHeaders.Authorization = null; 
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        var meResponse = await _client.GetAsync("/api/auth/me");
        
        Assert.Equal(HttpStatusCode.OK, meResponse.StatusCode);

        var profile = await meResponse.Content.ReadFromJsonAsync<UserDetailsResponse>();

        Assert.NotNull(profile);
        Assert.Equal(uniqueEmail, profile.Email);
        Assert.Equal("Test", profile.FirstName);
    }
}