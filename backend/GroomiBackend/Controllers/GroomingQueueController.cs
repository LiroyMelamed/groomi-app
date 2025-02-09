using GroomiBackend.Models;
using GroomiBackend.Repositories;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace GroomiBackend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class GroomingQueueController : ControllerBase
    {
        private readonly GroomingQueueRepository groomingQueue;

        public GroomingQueueController(GroomingQueueRepository groomingQueue)
        {
            this.groomingQueue = groomingQueue;
        }

        //SQL StoredProcedure
        [HttpGet("stored-procedure")]
        public GroomingQueueResponse GetAllUsingStoredProcedure()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return new GroomingQueueResponse(new GeneralResponse(false, "User not authenticated.", HttpContext.Request.Path), null);

                var queue = groomingQueue.GetGroomingQueueStoredProcedure(); // ✅ Use stored procedure
                return new GroomingQueueResponse(new GeneralResponse(true, "Fetched successfully!", HttpContext.Request.Path), queue);
            }
            catch (Exception ex)
            {
                return new GroomingQueueResponse(new GeneralResponse(false, "Internal Server Error: " + ex.Message, HttpContext.Request.Path), null);
            }
        }



        [HttpGet]
        public GroomingQueueResponse GetAll()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return new GroomingQueueResponse(new GeneralResponse(false, "User not authenticated.", HttpContext.Request.Path), null);

                var queue = groomingQueue.GetAll();
                return new GroomingQueueResponse(new GeneralResponse(true, "Fetched successfully!", HttpContext.Request.Path), queue);
            }
            catch (Exception ex)
            {
                return new GroomingQueueResponse(new GeneralResponse(false, "Internal Server Error: " + ex.Message, HttpContext.Request.Path), null);
            }
        }


        [HttpPost]
        public GeneralResponse Add([FromBody] GroomingQueue newEntry)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return new GeneralResponse(false, "User not authenticated.", HttpContext.Request.Path);

                if (groomingQueue.CheckTimeOfAppointment(newEntry.AppointmentTime, newEntry.Id))
                {
                    return new GeneralResponse(false, "Appointment has to be in half hour space between each other", HttpContext.Request.Path);
                }

                if (groomingQueue.CheckTimeOfAppointmentIsInThePast(newEntry.AppointmentTime))
                {
                    return new GeneralResponse(false, "Appointment can't be in the past", HttpContext.Request.Path);
                }

                newEntry.UserId = userId;
                groomingQueue.Add(newEntry);

                return new GeneralResponse(true, "Entry added successfully!", HttpContext.Request.Path);
            }
            catch (Exception ex)
            {
                return new GeneralResponse(false, "Internal Server Error: " + ex.Message, HttpContext.Request.Path);
            }
        }

        [HttpPut("{id}")]
        public GeneralResponse Update(int id, [FromBody] GroomingQueue updatedEntry)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return new GeneralResponse(false, "User not authenticated.", HttpContext.Request.Path);

                if (groomingQueue.CheckTimeOfAppointment(updatedEntry.AppointmentTime, id))
                {
                    return new GeneralResponse(false, "Appointment has to be in half hour space between each other", HttpContext.Request.Path);
                }

                if (groomingQueue.CheckTimeOfAppointmentIsInThePast(updatedEntry.AppointmentTime))
                {
                    return new GeneralResponse(false, "Appointment can't be in the past", HttpContext.Request.Path);
                }

                var existingEntry = groomingQueue.GetEntityById(id);
                if (existingEntry == null)
                    return new GeneralResponse(false, "Entry not found.", HttpContext.Request.Path);

                if (existingEntry.UserId != userId && !User.IsInRole("admin"))
                    return new GeneralResponse(false, "You can only update your own entries.", HttpContext.Request.Path);

                existingEntry.CustomerName = updatedEntry.CustomerName;
                existingEntry.AppointmentTime = updatedEntry.AppointmentTime;
                existingEntry.Description = updatedEntry.Description;
                groomingQueue.Update(existingEntry);

                return new GeneralResponse(true, "Entry updated successfully!", HttpContext.Request.Path);
            }
            catch (Exception ex)
            {
                return new GeneralResponse(false, "Internal Server Error: " + ex.Message, HttpContext.Request.Path);
            }
        }

        [HttpDelete("{id}")]
        public GeneralResponse Delete(int id)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

                if (string.IsNullOrEmpty(userId))
                    return new GeneralResponse(false, "User not authenticated.", HttpContext.Request.Path);

                var entry = groomingQueue.GetEntityById(id);
                if (entry == null)
                    return new GeneralResponse(false, "Entry not found.", HttpContext.Request.Path);

                if (entry.UserId != userId && !User.IsInRole("admin"))
                    return new GeneralResponse(false, "You can only delete your own entries.", HttpContext.Request.Path);

                groomingQueue.DeleteById(id);
                return new GeneralResponse(true, "Entry deleted successfully!", HttpContext.Request.Path);
            }
            catch (Exception ex)
            {
                return new GeneralResponse(false, "Internal Server Error: " + ex.Message, HttpContext.Request.Path);
            }
        }
    }
}
