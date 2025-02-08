using GroomiBackend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace GroomiBackend.Reposetories
{
    public abstract class Repository<T> 
        where T : class
    {
        private readonly AppDbContext context;

        protected abstract DbSet<T> GetTable(AppDbContext context);

        protected DbSet<T> GetTable()
        {
            return GetTable(context);
        }

        public Repository(AppDbContext context) 
        {
            this.context = context;
        }
        public List<T> GetAll() {
            return GetTable().ToList();
        }

        public T GetEntityById(object id) => GetTable().Find(id);

        public void Add(T entity)
        {
            GetTable().Add(entity);
            context.SaveChanges();
        }

        public void Delete(T entity)
        {
            GetTable().Remove(entity);
            context.SaveChanges();
        }

        public void DeleteById(object id)
        {
            var entity = GetTable().Find(id);
            if (entity != null)
            {
                GetTable().Remove(entity);
                context.SaveChanges();
            }
        }

        public void Update(T entity)
        {
            GetTable().Update(entity);
            context.SaveChanges();
        }

        public void UpdateById(object id, T updatedEntity)
        {
            var existingEntity = GetTable().Find(id);
            if (existingEntity != null)
            {
                context.Entry(existingEntity).CurrentValues.SetValues(updatedEntity);
                context.SaveChanges();
            }
        }
    }
}
