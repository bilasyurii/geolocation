using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Geolocation.Core.Abstractions.Services;
using Geolocation.Core.Entities;
using System;

namespace Geolocation.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaceController : ControllerBase
    {
        private readonly IPlaceService _placeService;
        public PlaceController(IPlaceService placeService)
        {
            _placeService = placeService;
        }

        [HttpGet]
        public ActionResult<List<Place>> Get()
        {
            try
            {
                var places = _placeService.Get();
                return Ok(places);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public ActionResult<Place> GetById([FromRoute] int id)
        {
            try
            {
                var place = _placeService.GetById(id);
                return Ok(place);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public ActionResult<Place> Post([FromBody] Place place)
        {
            try
            {
                var insertedPlace = _placeService.Insert(place);
                return Ok(insertedPlace);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public ActionResult<Place> Put([FromBody] Place place)
        {
            try
            {
                var updatedPlace = _placeService.Update(place);
                return Ok(updatedPlace);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            try
            {
                _placeService.Delete(id);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
