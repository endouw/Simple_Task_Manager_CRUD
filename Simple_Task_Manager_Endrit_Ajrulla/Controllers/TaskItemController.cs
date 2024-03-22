using Microsoft.AspNetCore.Mvc;
using Simple_Task_Manager_Endrit_Ajrulla.Entities;
using Simple_Task_Manager_Endrit_Ajrulla.Repository;

namespace Simple_Task_Manager_Endrit_Ajrulla.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TaskItemController : ControllerBase
    {
        private readonly ITaskItemRepository _taskRepository;

        public TaskItemController(ITaskItemRepository taskService)
        {
            _taskRepository = taskService;
        }

        // GET: api/Task
        [HttpGet]
        [Route("getTasks")]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            var tasks = await _taskRepository.GetAllTasksAsync();
            return Ok(tasks);
        }

        // GET: api/Task/5
        [HttpGet("{id}")]
        [Route("getTaskById/{id}")]

        public async Task<ActionResult<TaskItem>> GetTask(int id)
        {
            var task = await _taskRepository.GetTaskByIdAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // POST: api/Task
        [HttpPost]
        [Route("createTask")]


        public async Task<ActionResult<TaskItem>> PostTask(TaskItem taskItem)
        {
            var createdTask = await _taskRepository.CreateTaskAsync(taskItem);
            return CreatedAtAction(nameof(GetTask), new { id = createdTask.Id }, createdTask);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        [Route("updateTaskById/{id}")]

        public async Task<IActionResult> PutTask(int id, TaskItem taskItem)
        {
            if (id != taskItem.Id)
            {
                return BadRequest();
            }

            await _taskRepository.UpdateTaskAsync(taskItem);

            return NoContent();
        }

        // DELETE: api/Task/5
        [HttpDelete("{id}")]
        [Route("deleteTaskById/{id}")]

        public async Task<IActionResult> DeleteTask(int id)
        {
            await _taskRepository.DeleteTaskAsync(id);
            return NoContent();
        }

    }
}