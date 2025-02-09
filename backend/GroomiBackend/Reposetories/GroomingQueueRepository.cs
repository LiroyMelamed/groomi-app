using GroomiBackend.Data;
using GroomiBackend.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using GroomiBackend.Reposetories;

namespace GroomiBackend.Repositories
{
    public class GroomingQueueRepository : Repository<GroomingQueue>
    {
        private readonly string _connectionString;

        public GroomingQueueRepository(AppDbContext context, IConfiguration configuration) : base(context)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

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

        public bool CheckTimeOfAppointment(DateTime time, int? excludeAppointmentId = null)
        {
            DateTime minTime = time.AddMinutes(-29);
            DateTime maxTime = time.AddMinutes(29);

            return GetTable().Any(x =>
                x.AppointmentTime >= minTime &&
                x.AppointmentTime <= maxTime &&
                (excludeAppointmentId == null || x.Id != excludeAppointmentId)
            );
        }


        public bool CheckTimeOfAppointmentIsInThePast(DateTime time)
        {
            if (time < DateTime.Now)
            {
                return true;
            }

            return false;
        }

        //NEED TO RUN QUEERY TO YOUR DATABASE

        //USE YourDatabaseName; -- Change to your actual database name

        //GO
        //CREATE PROCEDURE GetGroomingQueue
        //AS
        //BEGIN
        //    SET NOCOUNT ON;
        //    SELECT* FROM GroomingQueue ORDER BY AppointmentTime ASC;
        //END;
        //GO

        public List<GroomingQueue> GetGroomingQueueStoredProcedure()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var result = connection.Query<GroomingQueue>(
                    "GetGroomingQueue",
                    commandType: CommandType.StoredProcedure
                );
                return result.ToList();
            }
        }

    }
}
