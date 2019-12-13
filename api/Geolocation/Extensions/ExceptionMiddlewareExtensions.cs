using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Diagnostics;
using System.Net;
using Geolocation.Core.ErrorHandling;

namespace Geolocation.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature != null)
                    {
                        await context.Response.WriteAsync(new ErrorDetails()
                        {
                            StatusCode = context.Response.StatusCode,
                            Information = "Internal Server Error."
                        }.ToString());
                    }
                });
            });
        }
    }
}
