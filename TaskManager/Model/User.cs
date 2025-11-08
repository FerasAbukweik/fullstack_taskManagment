namespace TaskManager.Model
{
    public class User
    {
        public long id { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
        public string phoneNumber { get; set; }
        public string hashedPassword { get; set; }
    }
}