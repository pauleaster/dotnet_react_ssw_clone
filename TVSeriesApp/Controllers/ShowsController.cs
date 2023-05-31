using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TVSeriesApp.Models;
using System.Threading.Tasks;
using System.Linq;

namespace TVSeriesApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowsController : ControllerBase
    {
        private readonly ILogger<ShowsController> _logger;
        private readonly ApplicationDbContext _context;

        public ShowsController(ILogger<ShowsController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateShow([FromBody] CreateShowDto showDto)
        {
            // Log the show variable
            _logger.LogInformation("Received showDto: {@showDto}", showDto);
            _logger.LogInformation("showDto.Name: {@showDto.Name}", showDto.Name);
            _logger.LogInformation("showDto.Name: {@showDto.Premiered}", showDto.Premiered);
            _logger.LogInformation("showDto.Name: {@showDto.Rating}", showDto.Rating);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the show already exists in the database
            bool showExists = _context.Shows.Any(s => s.Name == showDto.Name);

            if (showExists)
            {
                // Return a success response
                return Ok();
            }

            // Map the properties from the showDto to a new Show instance
            var show = new Show
            {
                Name = showDto.Name,
                Premiered = showDto.Premiered,
                Rating = showDto.Rating
            };

            // Add the new show to the context and save changes to the database
            _context.Shows.Add(show);
            await _context.SaveChangesAsync();

            // Return a 201 Created response with the created show
            return CreatedAtAction(nameof(CreateShow), show);
        }
    }
}
