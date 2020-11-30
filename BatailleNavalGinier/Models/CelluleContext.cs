using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BatailleNavalGinier.Models
{
    public class CelluleContext : DbContext
    {
        public CelluleContext(DbContextOptions<CelluleContext> options)
            : base(options)
        {
        }

        public DbSet<Cellule> TodoItems { get; set; }
    }
}
