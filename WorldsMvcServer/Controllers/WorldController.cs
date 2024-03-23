using Microsoft.AspNetCore.Mvc;
using WorldsMvcServer.Models.World;

namespace WorldsMvcServer.Controllers
{
    public class WorldController : Controller
    {
        public IActionResult New()
        {
            return View();
        }

        public IActionResult Index(int id)
        {
            return View();
        }

        public IActionResult World(int id)
        {
            string fileName = $"world{id}.json";
            string filePath = Path.Combine("wwwroot", "worlds", fileName);

            if (System.IO.File.Exists(filePath))
            {
                string json = System.IO.File.ReadAllText(filePath);
                WorldRawData data = new WorldRawData
                {
                    JsonConfig = json,
                    WorldId = id,
                };
                return View(data);
            }
            else
            {
                return RedirectToAction(nameof(Unknown));
            }
        }

        public IActionResult Unknown()
        {
            return View();
        }
    }
}
