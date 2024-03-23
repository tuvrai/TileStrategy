using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.IO;

namespace GameServer.Controllers
{

    public class WorldController : Controller
    {
        [HttpGet]
        public IActionResult New()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(WorldViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Generate configuration JSON
                var config = new WorldConfiguration
                {
                    Name = model.Name,
                    // Set other configuration properties based on model
                };
                string json = JsonConvert.SerializeObject(config);

                // Save configuration JSON to file
                string fileName = $"{model.Name}.json";
                string filePath = Path.Combine("wwwroot", "worlds", fileName);
                System.IO.File.WriteAllText(filePath, json);

                // Redirect to the new world
                return Redirect($"/World/{new Random().Next(1, 1000)}");
            }
            else
            {
                // Model validation failed, return to the create world form with validation errors
                return View("CreateWorld", model);
            }
        }

        public IActionResult EnterWorld(int id)
        {
            // Logic to retrieve the world by name
            // You can use the name parameter to fetch the corresponding world data
            // For example, query the database or load from a file

            // Return the appropriate view or data
            return View("World");
        }
    }

    public class WorldViewModel
    {
        public string Name { get; set; }

        public uint MaxPlayers { get; set; }
        public uint Size { get; set; }
        // Add other properties as needed
    }

    public class WorldConfiguration
    {
        public string Name { get; set; }

        public uint MaxPlayers { get; set; }
        public uint Size { get; set; }
        // Add other configuration properties as needed
    }

}
