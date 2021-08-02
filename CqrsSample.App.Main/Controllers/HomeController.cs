using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CqrsSample.App.Main.Controllers
{
    [ApiController]
    [Route("api/home")]
    [Authorize]
    public class HomeController : Controller
    {
        private ILogger<HomeController> Logger { get; }

        public HomeController(ILogger<HomeController> logger)
        {
            Logger = logger;
        }

        [Route("hello")]
        [HttpPost]
        public IActionResult Hello([FromBody] HomeHelloReq json)
        {
            return Json(new HomeHelloRes
            (
                hello: $"Hello, {json.name}!"
            ));
        }
    }

    public record HomeHelloReq
    (
        string name
    );

    public record HomeHelloRes
    (
        string hello
    );
}
