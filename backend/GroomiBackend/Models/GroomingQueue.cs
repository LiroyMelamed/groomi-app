using System.ComponentModel.DataAnnotations;

namespace GroomiBackend.Models
{
    public class GroomingQueue
    {
        public int Id { get; set; }

        [Required]
        public string CustomerName { get; set; }

        [Required]
        public DateTime AppointmentTime { get; set; } // Time customer wants grooming

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // When entry was created
    }
}
