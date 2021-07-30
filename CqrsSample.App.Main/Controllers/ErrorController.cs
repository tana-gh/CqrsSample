using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CqrsSample.App.Main.Controllers
{
    [ApiController]
    [Route("api/error")]
    public class ErrorController : ControllerBase
    {
        private ILogger<ErrorController> Logger { get; }

        public ErrorController(ILogger<ErrorController> logger)
        {
            Logger = logger;
        }

        [Route("error")]
        public IActionResult Error()
        {
            return Problem();
        }
    }
}
