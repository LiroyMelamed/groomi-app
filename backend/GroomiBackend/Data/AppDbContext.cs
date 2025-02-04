using Microsoft.EntityFrameworkCore;
using GroomiBackend.Models;

namespace GroomiBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<GroomingQueue> GroomingQueue { get; set; } // Add this line
    }
}
