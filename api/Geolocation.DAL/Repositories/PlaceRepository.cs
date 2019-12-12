using Geolocation.Core.Entities;

namespace Geolocation.DAL.Repositories
{
    public class PlaceRepository : BaseRepository<Place, int>
    {
        public PlaceRepository(GeolocationContext context) : base(context) { }
    }
}
