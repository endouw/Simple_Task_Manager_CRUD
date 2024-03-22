using Microsoft.EntityFrameworkCore;
using Simple_Task_Manager_Endrit_Ajrulla.ApplicationDbContext;
using Simple_Task_Manager_Endrit_Ajrulla.Repository;

var builder = WebApplication.CreateBuilder(args);
var connectionString = "";

// Add services to the container.
connectionString = builder.Configuration.GetConnectionString("DefaultConnection");



builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddScoped<ITaskItemRepository, TaskItemRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
