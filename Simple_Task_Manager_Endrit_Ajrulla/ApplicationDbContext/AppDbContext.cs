using Microsoft.EntityFrameworkCore;
using Simple_Task_Manager_Endrit_Ajrulla.Entities;

namespace Simple_Task_Manager_Endrit_Ajrulla.ApplicationDbContext
{
    public class AppDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public AppDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
        }

        public DbSet<TaskItem> Tasks { get; set; }
    }
}
