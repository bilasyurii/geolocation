using Geolocation.Core.Entities;
using System.Collections.Generic;

namespace Geolocation.Core.Abstractions.Services
{
    public interface IPlaceService<TId>
    {
        public List<Place> Get();
        public Place GetById(TId id);
        public Place Insert(Place user);
        public Place Update(Place user);
        public void Delete(TId id);
    }
}
