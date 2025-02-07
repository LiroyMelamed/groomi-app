using GroomiBackend.Models;
using GroomiBackend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace GroomiBackend.Controllers
{
    [Authorize] // 🔐 Requires authentication
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserRepository userRepository;

        public UserController(UserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = userRepository.GetAll();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = userRepository.GetUserById(id);
            if (user == null) return NotFound("User not found.");
            return Ok(user);
        }

        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authenticated.");

            var user = userRepository.GetUserById(int.Parse(userId));
            if (user == null) return NotFound("User not found.");

            return Ok(user);
        }

        [HttpDelete("me")]
        public IActionResult DeleteCurrentUser()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authenticated.");

            var user = userRepository.GetUserById(int.Parse(userId));
            if (user == null) return NotFound("User not found.");

            userRepository.DeleteById(user.Id);
            return Ok(new { message = "Account deleted successfully!" });
        }
    }
}
