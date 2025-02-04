using System;
using System.ComponentModel.DataAnnotations;

namespace GroomiBackend.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public DateTime RequestedTime { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
