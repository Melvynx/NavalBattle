using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BatailleNavalGinier.Models
{
    public class BoardContext : DbContext
    {

        public DbSet<Cellule> Cellules { get; set; }
        public DbSet<Board> Boards { get; set; }

        public BoardContext(DbContextOptions<BoardContext> options)
             : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Board>()
                .HasMany(b => b.Cellules).WithOne(c => c.Board);
        }
    }
}

