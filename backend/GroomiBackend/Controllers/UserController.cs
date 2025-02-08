using GroomiBackend.Models;
using GroomiBackend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace GroomiBackend.Controllers
{
    [Authorize] 
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
        public GeneralResponse GetAllUsers()
        {
            try
            {
                var users = userRepository.GetAll();
                return new GeneralResponse(true, "Users retrieved successfully.", HttpContext.Request.Path, users);
            }
            catch (Exception ex)
            {
                return new GeneralResponse(false, "Internal Server Error: " + ex.Message, HttpContext.Request.Path);
            }
        }

        [HttpGet("{id}")]
        public GeneralResponse GetUserById(int id)
        {
            try
            {
                var user = userRepository.GetUserById(id);
                if (user == null)
                {
                    return new GeneralResponse(false, "User not found.", HttpContext.Request.Path);
                }

                return new GeneralResponse(true, "User retrieved successfully.", HttpContext.Request.Path, user);
            }
            catch (Exception ex)
            {
                return new GeneralResponse(false, "Internal Server Error: " + ex.Message, HttpContext.Request.Path);
            }
        }

        [HttpGet("me")]
        public GeneralResponse GetCurrentUser()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return new GeneralResponse(false, "User not authenticated.", HttpContext.Request.Path);
                }

                var user = userRepository.GetUserById(int.Parse(userId));
                if (user == null)
                {
                    return new GeneralResponse(false, "User not found.", HttpContext.Request.Path);
                }

                return new GeneralResponse(true, "Current user retrieved successfully.", HttpContext.Request.Path, user);
            }
            catch (Exception ex)
            {
                return new GeneralResponse(false, "Internal Server Error: " + ex.Message, HttpContext.Request.Path);
            }
        }

        [HttpDelete("me")]
        public GeneralResponse DeleteCurrentUser()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return new GeneralResponse(false, "User not authenticated.", HttpContext.Request.Path);
                }

                var user = userRepository.GetUserById(int.Parse(userId));
                if (user == null)
                {
                    return new GeneralResponse(false, "User not found.", HttpContext.Request.Path);
                }

                userRepository.DeleteById(user.Id);
                return new GeneralResponse(true, "Account deleted successfully!", HttpContext.Request.Path);
            }
            catch (Exception ex)
            {
                return new GeneralResponse(false, "Internal Server Error: " + ex.Message, HttpContext.Request.Path);
            }
        }
    }
}
