using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.DTOs.Project
{
    public class AddProjectDto
    {
        public string name { get; set; }
        public string color {get; set; }
    }
}
