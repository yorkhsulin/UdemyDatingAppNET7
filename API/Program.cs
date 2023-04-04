using API.Extensiona;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityService(builder.Configuration); 



var app = builder.Build();

app.UseMiddleware<ExceptionMiddle>();

app.UseCors(builder=>builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));

app.UseAuthentication(); //check valid token

app.UseAuthorization(); //what allow to do

app.MapControllers();

app.Run();
