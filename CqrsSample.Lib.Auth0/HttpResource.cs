using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;

namespace CqrsSample.Lib.Auth0
{
    public record HttpResourceResult<TRes>
    (
        bool           IsSuccess,
        HttpStatusCode StatusCode,
        string         ReasonPhrase,
        TRes           Res
    );

    public abstract class HttpResource
    {
        private IHttpClientFactory HttpClientFactory { get; }

        public HttpResource(IHttpClientFactory httpClientFactory)
        {
            HttpClientFactory = httpClientFactory;
        }

        protected HttpClient CreateHttpClient(string bearer = "")
        {
            var httpClient = HttpClientFactory.CreateClient("Default");
            
            if (!string.IsNullOrWhiteSpace(bearer) && bearer.Count(c => c == ' ') == 1)
            {
                var auth = bearer.Split(' ');
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(auth[0], auth[1]);
            }

            return httpClient;
        }

        protected HttpResourceResult<TRes> Succeed<TRes>(HttpResponseMessage message, TRes res)
        {
            return new HttpResourceResult<TRes>(message.IsSuccessStatusCode, message.StatusCode, message.ReasonPhrase, res);
        }

        protected HttpResourceResult<TRes> Fail<TRes>(HttpResponseMessage message)
        {
            return new HttpResourceResult<TRes>(message.IsSuccessStatusCode, message.StatusCode, message.ReasonPhrase, default);
        }
    }
}
