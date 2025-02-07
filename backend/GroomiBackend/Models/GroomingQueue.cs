using System.ComponentModel.DataAnnotations;

namespace GroomiBackend.Models
{
    public class GroomingQueue
    {
        public int Id { get; set; }

        [Required]
        public string CustomerName { get; set; }

        [Required]
        public DateTime AppointmentTime { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string? UserId { get; set; }

        public string? Description { get; set; }
    }
}
