using Geolocation.Core.Abstractions.Repositories;
using System;

namespace Geolocation.Core.Abstractions
{
    public interface IUnitOfWork : IDisposable
    {
        IPlaceRepository Places{ get; }
        void SaveChanges();
    }
}
