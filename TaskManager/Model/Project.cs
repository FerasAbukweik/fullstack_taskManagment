using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Model
{
    public class Project
    { 
        public long id {get; set;}
        public string name {get; set;}
        public string color {get; set; }
        [ForeignKey("User")]
        public long? userId {get; set;}
        public User? User {get; set;}
    }
}
