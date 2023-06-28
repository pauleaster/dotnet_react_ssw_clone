using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;


namespace TVSeriesApp.Models
{
    public class  FavouritesDbContext : DbContext
    {

        public FavouritesDbContext(DbContextOptions<FavouritesDbContext> options) : base(options)
        {
        }

        public DbSet<Favourite> Favourites { get; set; }

    }
}

