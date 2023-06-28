using System;

namespace TVSeriesApp.Models
{
    public class CreateFavouriteDto
    {
        public string Name { get; set; }
        public string Premiered { get; set; }
        public double? Rating { get; set; }
        public double? MyRating { get; set; }
    }
}
