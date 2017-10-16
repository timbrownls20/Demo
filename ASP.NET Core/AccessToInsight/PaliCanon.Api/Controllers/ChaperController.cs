using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PaliCanon.Common;
using PaliCanon.Common.Model;
using PaliCanon.Common.Repository;

namespace PaliCanon.Api.Controllers
{
    [Route("api/[controller]")]
    public class ChapterController : Controller
    {
        // // GET api/values
        // [HttpGet]
        // public IEnumerable<string> Get()
        // {
        //     return new string[] { "value1", "value2" };
        // }

        IChapterRepository chapterRepository;

        public ChapterController()
        {
            //..TB TODO implement windsor
            var database = new DBConnect().Connect();
            chapterRepository = new ChapterRepository(database);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Chapter Get(int id)
        {
            return chapterRepository.Get(id);        
        }

    
    }
}
