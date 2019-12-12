using Geolocation.Core.Abstractions.Repositories;
using Geolocation.Core.Entities;

namespace Geolocation.DAL.Repositories
{
    public class PlaceRepository : BaseRepository<Place, int>, IPlaceRepository
    {
        public PlaceRepository(GeolocationContext context) : base(context) { }
    }
}
