using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using CqrsSample.Lib.Auth0;

namespace CqrsSample.App.Main.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Authorize]
    public class UserController : Controller
    {
        private ILogger<UserController> Logger { get; }
        private IConfiguration Configuration { get; }
        private IHttpClientFactory HttpClientFactory { get; }

        public UserController(ILogger<UserController> logger, IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            Logger            = logger;
            Configuration     = configuration;
            HttpClientFactory = httpClientFactory;
        }

        [Route("info")]
        [HttpGet]
        public async ValueTask<IActionResult> Info([FromServices] IUserInfoResource tokenInfoResource)
        {
            var result = await tokenInfoResource.FetchUserInfoAsync(Configuration["Auth0:Domain"], User.Identity.Name, Request.Headers["Authorization"]);

            if (!result.IsSuccess) return Problem(statusCode: (int)result.StatusCode, title: result.ReasonPhrase);

            return Json(new UserInfoRes
            (
                username  : string.IsNullOrEmpty(result.Res.userame)    ? "(no name)"    : result.Res.userame,
                pictureUrl: string.IsNullOrEmpty(result.Res.pictureUrl) ? "(no picture)" : result.Res.pictureUrl,
                providers : result.Res.providers == null                ? new string[0]  : result.Res.providers
            ));
        }
    }

    public record UserInfoRes
    (
        string   username,
        string   pictureUrl,
        string[] providers
    );
}
