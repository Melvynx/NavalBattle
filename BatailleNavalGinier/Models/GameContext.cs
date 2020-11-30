using Microsoft.EntityFrameworkCore;

namespace BatailleNavalGinier.Models
{
    public class GameContext : DbContext
    {
        public GameContext(DbContextOptions<GameContext> options)
            : base(options)
        {
        }

        public DbSet<Game> Games { get; set; }
    }
}
