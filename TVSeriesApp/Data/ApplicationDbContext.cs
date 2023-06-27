using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;


namespace TVSeriesApp.Models
{
    public class ApplicationDbContext : DbContext
    {

        private readonly ILogger<ApplicationDbContext> _logger;

        public ApplicationDbContext(ILogger<ApplicationDbContext> logger)
        {
            _logger = logger;
        }
        public DbSet<Show> Shows { get; set; }
        public DbSet<Show> Favourites { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string currentDirectory = Directory.GetCurrentDirectory();
            _logger.LogInformation("Current working directory: {CurrentDirectory}", currentDirectory);

            string relativePath = "./db/movies.db";

            string fullPath = Path.Combine(currentDirectory, relativePath);

            if (File.Exists(fullPath))
            {
                _logger.LogInformation("The db file exists: " + fullPath);
            }
            else
            {
                _logger.LogInformation("The db file does not exist: " + fullPath);
            }

            _logger.LogInformation("BEFORE optionsBuilder.UseSqlite(\"Data Source=\" + fullPath)" );
            optionsBuilder.UseSqlite("Data Source=" + fullPath);
            _logger.LogInformation("AFTER optionsBuilder.UseSqlite(\"Data Source=\" + fullPath)");
        }
    }
}

