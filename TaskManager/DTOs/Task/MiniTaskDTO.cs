using TaskManager.Enums;

namespace TaskManager.DTOs.Task
{
    public class MiniTaskDTO
    {
        public long id { get; set; }
        public string title { get; set; }
        public string? description { get; set; }
        public taskStatus status { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime? goalDate { get; set; }
        public DateTime? updatedAt { get; set; }
        public long? projectId { get; set; }
        public long? userId { get; set; }
        public bool mark { set; get; }
    }
}
