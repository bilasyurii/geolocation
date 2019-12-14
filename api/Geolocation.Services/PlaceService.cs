using Geolocation.Core.Abstractions;
using Geolocation.Core.Abstractions.Services;
using Geolocation.Core.Entities;
using Geolocation.Core.ErrorHandling;
using Geolocation.Core.Validators;
using System.Collections.Generic;
using System.Linq;

namespace Geolocation.Services
{
    public class PlaceService : IPlaceService
    {
        private readonly IUnitOfWork _unitOfWork;

        public PlaceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public List<Place> Get()
        {
            var places = _unitOfWork.Places.GetAll();
            return places.ToList();
        }

        public Place GetById(int id)
        {
            Place place = _unitOfWork.Places.GetById(id);
            if (place == null)
                throw new NotFoundException("a place", $"id {id}");
            return place;
        }

        private void PerformValidation(Place place)
        {
            PlaceValidator validator = new PlaceValidator();
            var validationResult = validator.Validate(place);
            if (!validationResult.IsValid)
                throw new FluentValidationException(validationResult.Errors);
        }

        public Place Insert(Place place)
        {
            PerformValidation(place);
            _unitOfWork.Places.Add(place);
            _unitOfWork.SaveChanges();
            return place;
        }

        public Place Update(Place place)
        {
            PerformValidation(place);
            var existingPlace = _unitOfWork.Places.GetById(place.Id);
            if (existingPlace == null)
                throw new NotFoundException("a place", $"id {place.Id}");
            existingPlace.Name = place.Name;
            existingPlace.Description = place.Description;
            existingPlace.Latitude = place.Latitude;
            existingPlace.Longitude = place.Longitude;
            _unitOfWork.Places.Update(existingPlace);
            _unitOfWork.SaveChanges();
            return _unitOfWork.Places.GetById(place.Id);
        }

        public void Delete(int id)
        {
            _unitOfWork.Places.DeleteById(id);
            _unitOfWork.SaveChanges();
        }
    }
}
