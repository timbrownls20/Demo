using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Demo.Controllers
{
    public class DemoController : Controller
    {
        // GET: /<controller>/
        public IActionResult NumericDropdown()
        {
            return View();
        }

        public IActionResult DisplayStatusCode(int id=200)
        {
            //.. none core way
            //return new HttpStatusCodeResult(200);

            //.. with view
            //Response.StatusCode = id;
            //return View(id);

            return base.StatusCode(id);
            
        }
    }
}
