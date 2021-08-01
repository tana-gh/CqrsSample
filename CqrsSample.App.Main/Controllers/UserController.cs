using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CqrsSample.App.Main.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private ILogger<UserController> Logger { get; }

        public UserController(ILogger<UserController> logger)
        {
            Logger = logger;
        }

        [Route("info")]
        [HttpGet]
        public UserInfoRes Info()
        {
            foreach (var claim in HttpContext.User.Claims)
            {
                System.Console.WriteLine(claim);
            }

            return new UserInfoRes
            (
                Name: HttpContext.User.Identity.Name
            );
        }
    }

    public record UserInfoRes
    (
        string Name
    );
}
