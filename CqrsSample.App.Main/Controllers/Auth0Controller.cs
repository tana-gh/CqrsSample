using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace CqrsSample.App.Main.Controllers
{
    [ApiController]
    [Route("api/auth0")]
    public class Auth0Controller : Controller
    {
        private ILogger<Auth0Controller> Logger { get; }
        private IConfiguration Configuration { get; } 

        public Auth0Controller(ILogger<Auth0Controller> logger, IConfiguration configuration)
        {
            Logger        = logger;
            Configuration = configuration;
        }

        [Route("keys")]
        [HttpGet]
        public IActionResult Keys()
        {
            return Json(new Auth0KeysRes
            (
                domain  : Configuration["Auth0:Domain"],
                clientId: Configuration["Auth0:ClientId"],
                audience: Configuration["Auth0:Audience"],
                scope   : Configuration["Auth0:Scope"]
            ));
        }
    }

    public record Auth0KeysRes
    (
        string domain,
        string clientId,
        string audience,
        string scope
    );
}
