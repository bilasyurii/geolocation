using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Geolocation.Core.Abstractions.Services;
using Geolocation.Core.Entities;
using System;
using Geolocation.Core.ErrorHandling;
using FluentValidation;

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
            var places = _placeService.Get();
            return Ok(places);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            try
            {
                var place = _placeService.GetById(id);
                return Ok(place);
            }
            catch (NotFoundException notFoundException)
            {
                return NotFound(notFoundException.ToString());
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Place place)
        {
            try
            {
                var insertedPlace = _placeService.Insert(place);
                return Created($"/place/{insertedPlace.Id}", insertedPlace);
            }
            catch (FluentValidationException validationException)
            {
                return BadRequest(validationException.ToString());
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] Place place)
        {
            try
            {
                var updatedPlace = _placeService.Update(place);
                return Ok(updatedPlace);
            }
            catch (FluentValidationException validationException)
            {
                return BadRequest(validationException.ToString());
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            try
            {
                _placeService.Delete(id);
                return NoContent();
            }
            catch (NotFoundException notFoundException)
            {
                return NotFound(notFoundException.ToString());
            }
        }
    }
}
