namespace Simple_Task_Manager_Endrit_Ajrulla.Entities
{
    public class TaskItem
    {
       public int Id { get; set; }
       public string Name { get; set; } 
       public DateTime DueDate { get; set; }

       public string Description { get; set; }

       public string Status { get; set; }
    }
}
