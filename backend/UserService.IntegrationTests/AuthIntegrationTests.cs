using System.Net;
using System.Net.Http.Json;
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
    public async Task Register_Should_Create_User_And_Return_Success()
    {
        var request = new RegisterRequest
        {
            FirstName = "Test",
            LastName = "User",
            Email = "test@example.com",
            Password = "Password123!"
        };

        var response = await _client.PostAsJsonAsync("/api/Auth/register", request);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}