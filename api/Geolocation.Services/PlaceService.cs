using FluentValidation;
using Geolocation.Core.Abstractions;
using Geolocation.Core.Abstractions.Services;
using Geolocation.Core.Entities;
using Geolocation.Core.Validators;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Geolocation.Services
{
    public class PlaceService : IPlaceService<int>
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
                throw new Exception($"Couldn't find a place with id {id}");
            return place;
        }

        public Place Insert(Place place)
        {
            PlaceValidator validator = new PlaceValidator();
            validator.ValidateAndThrow(place);
            _unitOfWork.Places.Add(place);
            _unitOfWork.SaveChanges();
            return place;
        }

        public Place Update(Place place)
        {
            var existingPlace = _unitOfWork.Places.GetById(place.Id);
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
