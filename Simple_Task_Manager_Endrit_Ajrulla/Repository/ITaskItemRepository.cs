using Simple_Task_Manager_Endrit_Ajrulla.Entities;

namespace Simple_Task_Manager_Endrit_Ajrulla.Repository
{
    public interface ITaskItemRepository
    {
        Task<IEnumerable<TaskItem>> GetAllTasksAsync();
        Task<TaskItem> GetTaskByIdAsync(int id);
        Task<TaskItem> CreateTaskAsync(TaskItem task);
        Task<TaskItem> UpdateTaskAsync(TaskItem task);
        Task DeleteTaskAsync(int id);
    }
}
