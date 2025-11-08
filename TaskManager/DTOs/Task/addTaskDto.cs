using System.ComponentModel.DataAnnotations.Schema;
using TaskManager.Enums;

namespace TaskManager.DTOs.Task
{
    public class AddTaskDto
    {
        public string title { get; set; }
        public string? description { get; set; }
        public DateTime? goalDate { get; set; }
        public long? projectId { get; set; }
    }
}
