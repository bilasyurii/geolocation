using Geolocation.Core.Entities;
using System.Collections.Generic;

namespace Geolocation.Core.Abstractions.Services
{
    public interface IPlaceService
    {
        public List<Place> Get();
        public Place GetById(int id);
        public Place Insert(Place user);
        public Place Update(Place user);
        public void Delete(int id);
    }
}
