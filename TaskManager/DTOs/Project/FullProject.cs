using TaskManager.DTOs.Task;

namespace TaskManager.DTOs.Project
{
    public class FullProject
    {
        public long projectId { get; set; }
        public String projectName { get; set; }
        public string headerColor {get; set; }
        public List<MiniTaskDTO> tasks { get; set; }
    }
}
