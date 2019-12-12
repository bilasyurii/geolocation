using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Geolocation.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaceController : ControllerBase
    {
        public PlaceController() { }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return null;
            /*
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();*/
        }
    }
}
