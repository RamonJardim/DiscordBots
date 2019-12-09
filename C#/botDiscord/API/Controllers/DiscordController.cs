using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class DiscordController : ApiController
    {
        // GET: api/Discord
        public IEnumerable<string> Get()
        {
            
            return new string[] { "value1", "value2" };
        }

        // GET: api/Discord/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Discord
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Discord/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Discord/5
        public void Delete(int id)
        {
        }
    }
}
