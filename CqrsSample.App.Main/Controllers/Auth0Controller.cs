using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace CqrsSample.App.Main.Controllers
{
    [ApiController]
    [Route("api/auth0")]
    public class Auth0Controller : ControllerBase
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
        public Auth0KeysRes Keys()
        {
            return new Auth0KeysRes
            (
                Domain  : Configuration["Auth0:Domain"],
                ClientId: Configuration["Auth0:ClientId"],
                Audience: Configuration["Auth0:Audience"],
                Scope   : Configuration["Auth0:Scope"]
            );
        }
    }

    public record Auth0KeysRes
    (
        string Domain,
        string ClientId,
        string Audience,
        string Scope
    );
}
