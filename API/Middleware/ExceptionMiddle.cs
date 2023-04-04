using System.Net;
using System.Security.Authentication.ExtendedProtection;
using System.Text.Json;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddle
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ApiException> _logger;
        private readonly IHostEnvironment _evn;
        public ExceptionMiddle(RequestDelegate next,ILogger<ApiException> logger,IHostEnvironment evn)
        {
            _evn = evn;
            _logger = logger;
            _next = next;
            
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex,ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var response = _evn.IsDevelopment()?
                               new ApiException(context.Response.StatusCode,ex.Message,ex.StackTrace?.ToString()):
                               new ApiException(context.Response.StatusCode,ex.Message,"Internal Server Error");


                var option = new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                var json = JsonSerializer.Serialize(response,option);
                await context.Response.WriteAsync(json);
            }
        }
    }
}