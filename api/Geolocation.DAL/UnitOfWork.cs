using Geolocation.Core.Abstractions;
using Geolocation.Core.Abstractions.Repositories;
using Geolocation.DAL.Repositories;

namespace Geolocation.DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        private GeolocationContext _context;

        public UnitOfWork(GeolocationContext context)
        {
            _context = context;
        }

        private IPlaceRepository _places;
        public IPlaceRepository Places =>
            _places ??= new PlaceRepository(_context);

        public void Dispose()
        {
            if (_context != null)
                _context.Dispose();
            _context = null;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
