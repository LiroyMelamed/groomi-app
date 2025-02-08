using GroomiBackend.Data;
using GroomiBackend.Models;
using GroomiBackend.Reposetories;
using Microsoft.EntityFrameworkCore;

namespace GroomiBackend.Repositories
{
    public class AuthRepository : Repository<User>
    {
        public AuthRepository(AppDbContext context) : base(context) { }

        protected override DbSet<User> GetTable(AppDbContext context)
        {
            return context.Users;
        }

        public User GetUserByUsername(string username)
        {
            return GetTable().FirstOrDefault(u => u.Username == username);
        }
    }
}
