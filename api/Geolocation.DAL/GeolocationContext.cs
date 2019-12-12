using Microsoft.EntityFrameworkCore;
using Geolocation.Core.Entities;

namespace Geolocation.DAL
{
    public class GeolocationContext : DbContext
    {
        public DbSet<Place> Places { get; set; }

        public GeolocationContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Place>(entity =>
            {
                entity.Property(place => place.Name).HasMaxLength(32);
                entity.Property(place => place.Description).HasMaxLength(256);
                entity.Property<decimal>(place => place.Latitude).HasColumnType("decimal(8, 6)");
                entity.Property<decimal>(place => place.Longitude).HasColumnType("decimal(9, 6)");
            });
        }
    }
}
