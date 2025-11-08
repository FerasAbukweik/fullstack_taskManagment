using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TaskManager.Enums;

namespace TaskManager.Model
{
    public class TaskModel
    {
        [Key]
        public long id {  get; set; }
        public string title { get; set; }
        public  string? description { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime? goalDate { get; set; }
        public DateTime? updatedAt { get; set; }
        public bool mark { set; get; }

        [ForeignKey("Project")]
        public long? projectId { get; set; }
        public Project? Project { get; set; }
        [ForeignKey("User")]
        public long? userId { get; set; }
        public User? User { get; set; }
    }
}
