using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManager.DTOs.Auth;
using TaskManager.Model;

namespace TaskManager.Controllers
{
    public class AuthController : ControllerBase
    {
        private readonly DBcontext _dbcontext;

        public AuthController(DBcontext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [HttpGet("login")]
        public IActionResult login([FromQuery] LoginDTO loginData)
        {
            User? user = _dbcontext.Users.FirstOrDefault(u => u.email == loginData.email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginData.Password, user.hashedPassword))
            {
                return NotFound("Wrong Input");
            }

            return Ok(new { token = generateJWTToken(user)});

        }

        private string generateJWTToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.id.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mdkfa#&$(*1u8fhq(Q@(hfngoaoa892#*(@hufiai"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                signingCredentials: creds,
                expires: DateTime.Now.AddHours(1)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
