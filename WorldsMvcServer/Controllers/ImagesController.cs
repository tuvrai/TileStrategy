using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using System.Web;

namespace WorldsMvcServer.Controllers
{
    public class ImagesController : Controller
    {
        public ActionResult GetImage(string filename)
        {
            return File(string.Empty, "image/png");
        }
    }
}
