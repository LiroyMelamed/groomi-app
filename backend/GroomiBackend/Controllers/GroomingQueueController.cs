using GroomiBackend.Data;
using GroomiBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


namespace GroomiBackend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class GroomingQueueController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GroomingQueueController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var queue = await _context.GroomingQueue.ToListAsync();
            return Ok(queue);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] GroomingQueue newEntry)
        {
            if (string.IsNullOrEmpty(newEntry.CustomerName))
                return BadRequest("Customer name is required.");

            _context.GroomingQueue.Add(newEntry);
            await _context.SaveChangesAsync();
            return Ok(newEntry);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] GroomingQueue updatedEntry)
        {
            var existingEntry = await _context.GroomingQueue.FindAsync(id);
            if (existingEntry == null) return NotFound();

            existingEntry.CustomerName = updatedEntry.CustomerName;
            existingEntry.AppointmentTime = updatedEntry.AppointmentTime;
            await _context.SaveChangesAsync();

            return Ok(existingEntry);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entry = await _context.GroomingQueue.FindAsync(id);
            if (entry == null) return NotFound();

            _context.GroomingQueue.Remove(entry);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("filter")]
public async Task<IActionResult> GetFiltered([FromQuery] string? name, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
{
    var query = _context.GroomingQueue.AsQueryable();

    if (!string.IsNullOrEmpty(name))
    {
        query = query.Where(q => q.CustomerName.Contains(name));
    }

    if (startDate.HasValue)
    {
        query = query.Where(q => q.AppointmentTime >= startDate.Value);
    }

    if (endDate.HasValue)
    {
        query = query.Where(q => q.AppointmentTime <= endDate.Value);
    }

    var result = await query.ToListAsync();
    return Ok(result);
}

    }
}
