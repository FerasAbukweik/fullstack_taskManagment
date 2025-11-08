using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Security.Claims;
using System.Threading.Tasks;
using TaskManager.DTOs.Task;
using TaskManager.Model;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;


namespace TaskManager.Controllers
{
    [Authorize]
    [Route("api/TasksController")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private long tokenUserId => long.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value ?? "0");
        private DBcontext _dbcontext;
        public TasksController(DBcontext dbContext)
        {
            _dbcontext = dbContext;
        }
        [HttpPost("add")]
        public IActionResult add([FromBody] AddTaskDto newTask)
        {
            try
            {
                var task = new TaskModel
                {
                    title = newTask.title,
                    description = newTask.description,
                    createdAt = DateTime.Now,
                    goalDate = newTask.goalDate,
                    updatedAt = null,
                    projectId = newTask.projectId,
                    userId = tokenUserId,
                    mark = false
                };
                _dbcontext.Tasks.Add(task);
                _dbcontext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }
        }
        [Authorize]
        [HttpPut("update")]
        public IActionResult update([FromBody] updateTaskDTO updateData )
        {
            try
            {
                var toUpdate = _dbcontext.Tasks.FirstOrDefault(t => t.id == updateData.taskId);
                if (toUpdate == null)
                {
                    return BadRequest("Task Not Found");
                }

                toUpdate.title = updateData.title != null ? updateData.title : toUpdate.title;
                toUpdate.goalDate = updateData.GoalDate != null ? updateData.GoalDate : toUpdate.goalDate;
                toUpdate.updatedAt = DateTime.Now;
                toUpdate.projectId = updateData.projectId;
                _dbcontext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize]
        [HttpDelete("delete")]
        public IActionResult delete([FromQuery] long toDelTaskId)
        {
            try
            {
                var toDel = _dbcontext.Tasks.FirstOrDefault(t => t.id == toDelTaskId);
                if (toDel == null)
                {
                    return BadRequest("Task Not Found");
                }
                _dbcontext.Remove(toDel);
                _dbcontext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [Authorize]
        [HttpPut("updateDescription")]
        public IActionResult updateDescription([FromBody] updateDescriptionDTO newData )
        {
            try
            {
                var toUpdate = _dbcontext.Tasks.FirstOrDefault(t => t.id == newData.id);
                if (toUpdate == null)
                {
                    return BadRequest("Task Not Found");
                }
                toUpdate.description = newData.newDescription;
                _dbcontext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }
        }
    }   
}
