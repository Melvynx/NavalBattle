using Microsoft.EntityFrameworkCore;

namespace BatailleNavalGinier.Models
{
    public class CelluleContext : DbContext
    {
        public CelluleContext(DbContextOptions<CelluleContext> options)
            : base(options)
        {
        }

        public DbSet<Cellule> Cellules { get; set; }
    }
}
