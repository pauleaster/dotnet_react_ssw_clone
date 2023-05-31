using System;

namespace TVSeriesApp.Models
{
    public class CreateShowDto
    {
        public string Name { get; set; }
        public string Premiered { get; set; }
        public double? Rating { get; set; }
    }
}
