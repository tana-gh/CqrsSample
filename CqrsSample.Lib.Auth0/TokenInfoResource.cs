using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace CqrsSample.Lib.Auth0
{
    public interface IUserInfoResource
    {
        ValueTask<HttpResourceResult<UserInfoRes>> FetchUserInfoAsync(string domain, string userId, string bearer);
    }

    public class UserInfoResource : HttpResource, IUserInfoResource
    {
        public UserInfoResource(IHttpClientFactory httpClientFactory)
            : base(httpClientFactory)
        {
        }

        public async ValueTask<HttpResourceResult<UserInfoRes>> FetchUserInfoAsync(string domain, string userId, string bearer)
        {
            var httpClient = CreateHttpClient(bearer);
            
            using var resMessage = await httpClient.GetAsync($"https://{domain}/api/v2/users/{userId}");

            if (!resMessage.IsSuccessStatusCode) return Fail<UserInfoRes>(resMessage);
            
            var json = JsonSerializer.Deserialize<JsonElement>(await resMessage.Content.ReadAsStringAsync());
            var res  = new UserInfoRes
            (
                userame   : json.TryGetProperty("username"  , out var username  ) ? username.GetString() : "",
                pictureUrl: json.TryGetProperty("picture"   , out var picture   ) ? picture .GetString() : "",
                providers : json.TryGetProperty("identities", out var identities)
                    ? identities.EnumerateArray().Select(id => id.TryGetProperty("provider", out var provider) ? provider.GetString() : "").ToArray()
                    : new string[0]
            );

            return Succeed(resMessage, res);
        }
    }

    public record UserInfoRes
    (
        string   userame,
        string   pictureUrl,
        string[] providers
    );
}
