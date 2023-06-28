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
using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.SqlServer;
using System.Diagnostics;


namespace TVSeriesApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            TestSqlServerConnection(configuration); // Test SQL Server connection

            CreateWebHostBuilder(args, configuration).Build().Run();
        }

        private static void TestSqlServerConnection(IConfiguration configuration)
        {
            Debug.WriteLine("**************************************************************");
            var optionsBuilder = new DbContextOptionsBuilder<FavouritesDbContext>();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("MSSQLConnection"));

            using (var dbContext = new FavouritesDbContext(optionsBuilder.Options))
            {
                try
                {
                    dbContext.Database.OpenConnection();
                    var connectionState = dbContext.Database.GetDbConnection().State;

                    if (connectionState == System.Data.ConnectionState.Open)
                    {
                        Debug.WriteLine("SQL Server connection established successfully.");
                        // Perform additional database operations if needed.
                    }
                    else
                    {
                        Debug.WriteLine("Failed to open SQL Server connection.");
                    }
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(
                        $"An error occurred while connecting to SQL Server: {ex.Message}"
                    );
                }
            }
        }

        public static IWebHostBuilder CreateWebHostBuilder(
            string[] args,
            IConfiguration configuration
        ) =>
            WebHost
                .CreateDefaultBuilder(args)
                .ConfigureServices(
                    (hostContext, services) =>
                    {
                        services.AddMvc(options => options.EnableEndpointRouting = false);

                        // Configure Shows database (SQLite)
                        services.AddDbContext<ApplicationDbContext>(
                            options =>
                                options.UseSqlite(
                                    configuration.GetConnectionString("SQLiteConnection")
                                )
                        );

                        // Configure Favourites database (MS SQL)
                        services.AddDbContext<FavouritesDbContext>(
                            options =>
                                options.UseSqlServer(
                                    configuration.GetConnectionString("MSSQLConnection")
                                )
                        );

                        // In production, the React files will be served from this directory
                        services.AddSpaStaticFiles(configuration =>
                        {
                            configuration.RootPath = "ClientApp/build";
                        });
                    }
                )
                .Configure(
                    (hostContext, app) =>
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
                                template: "{controller}/{action=Index}/{id?}"
                            );
                        });

                        app.UseSpa(spa =>
                        {
                            spa.Options.SourcePath = "ClientApp";

                            if (env.IsDevelopment())
                            {
                                spa.UseReactDevelopmentServer(npmScript: "start");
                            }
                        });
                    }
                );
    }
}
