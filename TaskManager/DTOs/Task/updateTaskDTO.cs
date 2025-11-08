namespace TaskManager.DTOs.Task
{
    public class updateTaskDTO
    {
        public long taskId { set; get; }
        public String? title { set; get; }
        public DateTime? GoalDate { set; get; }
        public long projectId { set; get; }
    }
}
