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

        [HttpGet]
        public IActionResult GetAll()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authenticated.");

            var queue = groomingQueue.GetByUserId(userId);
            return Ok(queue);
        }

        [HttpPost]
        public IActionResult Add([FromBody] GroomingQueue newEntry)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authenticated.");

            newEntry.UserId = userId;
            groomingQueue.Add(newEntry);

            return Ok(new { message = "Entry added successfully!", entry = newEntry });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] GroomingQueue updatedEntry)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authenticated.");

            var existingEntry = groomingQueue.GetEntityById(id);
            if (existingEntry == null) return NotFound();
            if (existingEntry.UserId != userId) return Forbid("You can only update your own entries.");

            existingEntry.CustomerName = updatedEntry.CustomerName;
            existingEntry.AppointmentTime = updatedEntry.AppointmentTime;
            groomingQueue.Update(existingEntry);

            return Ok(existingEntry);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authenticated.");

            var entry = groomingQueue.GetEntityById(id);
            if (entry == null) return NotFound();
            if (entry.UserId != userId) return Forbid("You can only delete your own entries.");

            groomingQueue.DeleteById(id);
            return Ok(new { message = "Entry deleted successfully!" });
        }

        [HttpGet("filter")]
        public IActionResult GetFiltered([FromQuery] string? name, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authenticated.");

            var filteredEntries = groomingQueue.GetByDateRange(startDate ?? DateTime.MinValue, endDate ?? DateTime.MaxValue)
                                               .Where(q => q.UserId == userId)
                                               .ToList();

            if (!string.IsNullOrEmpty(name))
            {
                filteredEntries = filteredEntries.Where(q => q.CustomerName.Contains(name)).ToList();
            }

            return Ok(filteredEntries);
        }
    }
}
