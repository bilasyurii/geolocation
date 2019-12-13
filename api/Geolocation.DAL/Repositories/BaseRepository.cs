using Microsoft.EntityFrameworkCore;
using Geolocation.Core.Entities;
using System;
using System.Collections.Generic;
using Geolocation.Core.Abstractions.Repositories;
using System.Linq;
using System.Linq.Expressions;
using Geolocation.Core.ErrorHandling;

namespace Geolocation.DAL.Repositories
{
    public abstract class BaseRepository<TEntity, TId> : IRepository<TEntity, TId> where TEntity : class, IEntity<TId>
    {
        protected readonly GeolocationContext _context;

        public BaseRepository(GeolocationContext context)
        {
            _context = context;
        }

        public TEntity GetById(TId id)
        {
            return _context.Set<TEntity>().Find(id);
        }

        public IQueryable<TEntity> GetAll()
        {
            return _context.Set<TEntity>();
        }

        public IQueryable<TEntity> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return _context.Set<TEntity>().Where(predicate);
        }

        public void Add(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);
        }

        public void AddMany(IEnumerable<TEntity> entities)
        {
            _context.AddRange(entities);
        }

        public void Delete(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
        }

        public void DeleteById(TId id)
        {
            TEntity found = _context.Set<TEntity>().Find(id);
            if (found != null)
                _context.Set<TEntity>().Remove(found);
            else
                throw new NotFoundException("an entity", $"id {id}");
        }

        public void DeleteMany(IEnumerable<TEntity> entities)
        {
            _context.RemoveRange(entities);
        }

        public void Update(TEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
        }

        public int Count()
        {
            return _context.Set<TEntity>().Count();
        }
    }
}
