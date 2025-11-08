using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Metadata;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.Security.Claims;
using TaskManager.DTOs.Project;
using TaskManager.DTOs.Task;
using TaskManager.Model;

namespace TaskManager.Controllers
{

    [Route("api/Projects")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private long tokenUserId => long.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value ?? "0");
        private DBcontext _dbcontext;
        public ProjectsController(DBcontext dbContext) {
            _dbcontext = dbContext;
        }

        [Authorize]
        [HttpPost("add")]
        public IActionResult add([FromBody] AddProjectDto newProject) {
            try
            {
                var existingProject = _dbcontext.Projects.FirstOrDefault(p => p.name == newProject.name && p.userId == tokenUserId);
                if (existingProject != null)
                {
                    return BadRequest("Project with this name already exists");
                }
                var project = new Project
                {
                    name = newProject.name,
                    color = newProject.color,
                    userId = tokenUserId
                };
                _dbcontext.Projects.Add(project);
                _dbcontext.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }
        }

        [Authorize]
        [HttpGet("getFullProjects")]
        public IActionResult getFullProjects()
        {
            try
            {
                var projects = _dbcontext.Projects.Where(p => p.userId == tokenUserId);

                var fullProjects = projects.Select(p => new FullProject
                {
                    projectId = p.id,
                    projectName = p.name,
                    headerColor = p.color,
                    tasks = _dbcontext.Tasks.Where(t => t.projectId == p.id)
                    .Select(t => new MiniTaskDTO
                    {
                        id = t.id,
                        title = t.title,
                        description = t.description,
                        createdAt = t.createdAt,
                        goalDate = t.goalDate,
                        updatedAt = t.updatedAt,
                        projectId = t.projectId,
                        mark = t.mark
                    }).ToList()
                }).ToList();

                return Ok(fullProjects);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("delete")]
        public IActionResult delete(long toDelId)
        {
            try
            {
                var toDel = _dbcontext.Projects.FirstOrDefault(p => p.id == toDelId);
                if (toDel == null)
                {
                    return BadRequest("Project Not Found");
                }
                var relatedTasks = _dbcontext.Tasks.Where(t => t.projectId == toDelId).ToList();
                foreach (var task in relatedTasks)
                {
                    _dbcontext.Tasks.Remove(task);
                }
                _dbcontext.Projects.Remove(toDel);
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
