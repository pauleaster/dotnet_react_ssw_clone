using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TVSeriesApp.Models;
using System.Threading.Tasks;
using System.Linq;

namespace TVSeriesApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouritesController  : ControllerBase
    {
        private readonly ILogger<FavouritesController> _logger;
        private readonly FavouritesDbContext  _context;

        public FavouritesController(ILogger<FavouritesController> logger, FavouritesDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateFavourite([FromBody] CreateFavouriteDto favouriteDto)
        {
            // Log the favourite variable
            _logger.LogInformation("Received favouriteDto: {@favouriteDto}", favouriteDto);
            _logger.LogInformation("favouriteDto.Name: {@favouriteDto.Name}", favouriteDto.Name);
            _logger.LogInformation("favouriteDto.Name: {@favouriteDto.Premiered}", favouriteDto.Premiered);
            _logger.LogInformation("favouriteDto.Name: {@favouriteDto.Rating}", favouriteDto.Rating);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the favourite already exists in the database
            bool favouriteExists = _context.Favourites.Any(s => s.Name == favouriteDto.Name);

            if (favouriteExists)
            {
                // Return a success response
                return Ok();
            }

            // Map the properties from the favouriteDto to a new Favourite instance
            var favourite = new Favourite
            {
                Name = favouriteDto.Name,
                Premiered = favouriteDto.Premiered,
                Rating = favouriteDto.Rating
            };

            // Add the new favourite to the context and save changes to the database
            _context.Favourites.Add(favourite);
            await _context.SaveChangesAsync();

            // Return a 201 Created response with the created favourite
            return CreatedAtAction(nameof(CreateFavourite), favourite);
        }
    }
}
