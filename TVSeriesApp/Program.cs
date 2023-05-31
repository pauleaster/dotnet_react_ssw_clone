using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using TVSeriesApp.Models;

namespace TVSeriesApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                 .ConfigureServices((hostContext, services) =>
                 {
                     services.AddMvc(options => options.EnableEndpointRouting = false);

                     // Register the ApplicationDbContext as a service
                     services.AddDbContext<ApplicationDbContext>();

                     // In production, the React files will be served from this directory
                     services.AddSpaStaticFiles(configuration =>
                     {
                         configuration.RootPath = "ClientApp/build";
                     });
                 })
                .Configure((hostContext, app) =>
                {
                    var env = hostContext.HostingEnvironment;
                    if (env.IsDevelopment())
                    {
                        app.UseDeveloperExceptionPage();
                    }
                    else
                    {
                        app.UseExceptionHandler("/Error");
                        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                        app.UseHsts();
                    }

                    app.UseHttpsRedirection();
                    app.UseStaticFiles();
                    app.UseSpaStaticFiles();

                    app.UseMvc(routes =>
                    {
                        routes.MapRoute(
                            name: "default",
                            template: "{controller}/{action=Index}/{id?}");
                    });

                    app.UseSpa(spa =>
                    {
                        spa.Options.SourcePath = "ClientApp";

                        if (env.IsDevelopment())
                        {
                            spa.UseReactDevelopmentServer(npmScript: "start");
                        }
                    });
                });
    }
}
