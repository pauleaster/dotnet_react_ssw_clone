using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace TVSeriesApp.Models
{
    public class Favourite
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }
        public string Premiered { get; set; }
        public double? Rating { get; set; }
        public double? MyRating { get; set; }
    }

}
