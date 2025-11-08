using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.DTOs.User;
using TaskManager.Model;

namespace TaskManager.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private DBcontext _dbContext;
        public UsersController(DBcontext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost("add")]
        public IActionResult add([FromBody]AddUserDTO toAddUser)
        {
            try
            {
                User? foundUser = _dbContext.Users.FirstOrDefault(x => x.email.ToLower() == toAddUser.email.ToLower());
                if(foundUser != null) { return BadRequest("User with this email already exists"); }
                var newUser = new User
                {
                    userName = toAddUser.userName,
                    email = toAddUser.email,
                    phoneNumber = toAddUser.phoneNumber,
                    hashedPassword = BCrypt.Net.BCrypt.HashPassword(toAddUser.password)
                };
                _dbContext.Users.Add(newUser);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("delete")]
        public IActionResult delete([FromQuery]long userId)
        {
            try
            {
                var user = _dbContext.Users.FirstOrDefault(x=>x.id == userId);
                if (user == null)
                {
                    return NotFound("User not found");
                }
                _dbContext.Users.Remove(user);
                _dbContext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
