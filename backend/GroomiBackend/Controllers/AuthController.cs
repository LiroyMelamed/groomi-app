using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GroomiBackend.Models;
using GroomiBackend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace GroomiBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthRepository users;
        private readonly IConfiguration _config;

        public AuthController(AuthRepository users, IConfiguration config)
        {
            this.users = users;
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public GeneralResponse Register([FromBody] RegisterRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.PasswordHash))
                {
                    return new GeneralResponse(false, "Username and Password are required.", HttpContext.Request.Path);
                }

                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.PasswordHash);

                var checkUserName = users.GetUserByUsername(request.Username);
                if (checkUserName != null)
                {
                    return new GeneralResponse(false, "Username is already taken.", HttpContext.Request.Path);
                }

                var user = new User
                {
                    Username = request.Username,
                    PasswordHash = hashedPassword,
                    FullName = request.FullName,
                    Role = request.Role,
                };

                users.Add(user);
                users.Update(user);

                return new GeneralResponse(true, "User registered successfully!", HttpContext.Request.Path);
            }
            catch (Exception ex)
            {
                return new GeneralResponse(false, "Internal Server Error: " + ex.Message, HttpContext.Request.Path);
            }
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public UserResponse Login([FromBody] LoginRequest request)
        {
            try
            {
                var user = users.GetUserByUsername(request.Username);

                if (user == null || !BCrypt.Net.BCrypt.Verify(request.PasswordHash, user.PasswordHash))
                {
                    return new UserResponse(new GeneralResponse(false, "Invalid username or password.", HttpContext.Request.Path), null);
                }

                var token = GenerateJwtToken(user);
                HttpContext.Response.Headers.Add("Authorization", "Bearer " + token);

                return new UserResponse(new GeneralResponse(true, "Login successful!", HttpContext.Request.Path, token), user);
            }
            catch (Exception ex)
            {
                return new UserResponse(new GeneralResponse(false, "Internal Server Error: " + ex.Message, HttpContext.Request.Path), null);
            }
        }

        private string GenerateJwtToken(User user)
        {
            var key = Encoding.UTF8.GetBytes(_config["JwtSettings:Secret"]);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(_config["JwtSettings:ExpirationInMinutes"])),
                Issuer = _config["JwtSettings:Issuer"],
                Audience = _config["JwtSettings:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

    public class RegisterRequest
    {
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; } = "user";
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string PasswordHash { get; set; }
    }
}
