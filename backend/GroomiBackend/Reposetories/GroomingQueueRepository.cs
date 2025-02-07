using GroomiBackend.Data;
using GroomiBackend.Models;
using GroomiBackend.Reposetories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroomiBackend.Repositories
{
    public class GroomingQueueRepository : Repository<GroomingQueue>
    {
        public GroomingQueueRepository(AppDbContext context) : base(context) { }

        protected override DbSet<GroomingQueue> GetTable(AppDbContext context)
        {
            return context.GroomingQueue;
        }

        public List<GroomingQueue> GetByUserId(string userId)
        {
            return GetTable().Where(q => q.UserId == userId).ToList();
        }

        public List<GroomingQueue> GetByDateRange(DateTime startDate, DateTime endDate)
        {
            return GetTable()
                .Where(q => q.AppointmentTime >= startDate && q.AppointmentTime <= endDate)
                .ToList();
        }

        public bool UserHasAppointment(string userId)
        {
            return GetTable().Any(q => q.UserId == userId);
        }

        public List<GroomingQueue> GetUpcomingAppointments(int limit = 10)
        {
            return GetTable()
                .OrderBy(q => q.AppointmentTime)
                .Take(limit)
                .ToList();
        }

    }
}
