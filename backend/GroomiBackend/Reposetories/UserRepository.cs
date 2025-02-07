using GroomiBackend.Data;
using GroomiBackend.Models;
using GroomiBackend.Reposetories;
using Microsoft.EntityFrameworkCore;

namespace GroomiBackend.Repositories
{
    public class UserRepository : Repository<User>
    {
        public UserRepository(AppDbContext context) : base(context) { }

        protected override DbSet<User> GetTable(AppDbContext context)
        {
            return context.Users;
        }

        public User GetByUsername(string username)
        {
            return GetTable().FirstOrDefault(u => u.Username == username);
        }

        public bool UsernameExists(string username)
        {
            return GetTable().Any(u => u.Username == username);
        }

        public User GetUserById(int userId)
        {
            return GetEntityById(userId);
        }
    }
}
