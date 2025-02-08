using System.ComponentModel.DataAnnotations;

namespace GroomiBackend.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public  string PasswordHash { get; set; }

        [Required]
        public string FullName { get; set; }

        public string Role { get; set; }
    }
}
