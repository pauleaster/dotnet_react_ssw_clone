using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TVSeriesApp.Models;
using System.Text.Json;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace TVSeriesApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouritesController : ControllerBase
    {
        private readonly ILogger<FavouritesController> _logger;
        private readonly FavouritesDbContext _context;

        public FavouritesController(
            ILogger<FavouritesController> logger,
            FavouritesDbContext context
        )
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateFavourite([FromBody] JsonElement show)
        {
            try
            {
                // Log the show JSON as a string
                var showJson = show.ToString();
                _logger.LogInformation("Received show JSON: {showJson}", showJson);

                // Deserialize the received object to the appropriate type (assuming Show class)
                var showObject = JsonSerializer.Deserialize<Show>(show.GetRawText());

                // Log the showObject variable
                _logger.LogInformation("Deserialized showObject: {@showObject}", showObject);
                _logger.LogInformation("showObject.Name: {@showObject.Name}", showObject.Name);
                _logger.LogInformation(
                    "showObject.Premiered: {@showObject.Premiered}",
                    showObject.Premiered
                );
                _logger.LogInformation(
                    "showObject.Rating: {@showObject.Rating}",
                    showObject.Rating
                );

                // Perform the mapping from showObject to favouriteDto
                var favouriteDto = new CreateFavouriteDto
                {
                    Name = showObject.Name,
                    Premiered = showObject.Premiered,
                    Rating = showObject.Rating
                };

                // Log the favourite variable
                _logger.LogInformation("Received favouriteDto: {@favouriteDto}", favouriteDto);
                _logger.LogInformation(
                    "favouriteDto.Name: {@favouriteDto.Name}",
                    favouriteDto.Name
                );
                _logger.LogInformation(
                    "favouriteDto.Premiered: {@favouriteDto.Premiered}",
                    favouriteDto.Premiered
                );
                _logger.LogInformation(
                    "favouriteDto.Rating: {@favouriteDto.Rating}",
                    favouriteDto.Rating
                );

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
                    Rating = favouriteDto.Rating,
                    MyRating = null
                };

                // Add the new favourite to the context and save changes to the database
                _context.Favourites.Add(favourite);
                await _context.SaveChangesAsync();

                // Return a 201 Created response with the created favourite
                return CreatedAtAction(nameof(CreateFavourite), favourite);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error adding show to favourites: {0}", ex);
                return BadRequest();
            }
        }

        [HttpGet]
        public IActionResult GetFavourites()
        {
            try
            {
                var favourites = _context.Favourites.ToList();
                return Ok(favourites);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error fetching favourites: {0}", ex);
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavourite(int id)
        {
            try
            {
                // Find the favourite by ID
                var favourite = await _context.Favourites.FindAsync(id);

                // If the favourite doesn't exist, return a not found response
                if (favourite == null)
                {
                    return NotFound();
                }

                // Remove the favourite from the context
                _context.Favourites.Remove(favourite);

                // Save changes to the database
                await _context.SaveChangesAsync();

                // Return a success response
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error deleting favourite: {0}", ex);
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFavouriteRating(int id, [FromBody] CreateFavouriteDto updateDto)
        {
            try
            {
                // Find the favourite by ID
                var favourite = await _context.Favourites.FindAsync(id);

                // If the favourite doesn't exist, return a not found response
                if (favourite == null)
                {
                    return NotFound();
                }

                // Update the MyRating property of the favourite
                favourite.MyRating = updateDto.MyRating;

                // Log the favourite variable
                _logger.LogInformation("Received favourite: {@favourite}", favourite);
                _logger.LogInformation(
                    "favourite.Name: {@favourite.Name}",
                    favourite.Name
                );
                _logger.LogInformation(
                    "favourite.Premiered: {@favourite.Premiered}",
                    favourite.Premiered
                );
                _logger.LogInformation(
                    "favourite.Rating: {@favourite.Rating}",
                    favourite.Rating
                );
                _logger.LogInformation(
                    "favourite.MyRating: {@favourite.MyRating}",
                    favourite.MyRating
                );

                // Save changes to the database
                await _context.SaveChangesAsync();

                // Return a success response
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error updating favourite rating: {0}", ex);
                return BadRequest();
            }
        }
    }
}
