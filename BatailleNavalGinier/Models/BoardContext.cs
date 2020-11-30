using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BatailleNavalGinier.Models
{
    public class BoardContext : DbContext
    {
        public BoardContext(DbContextOptions<BoardContext> options)
             : base(options)
        {
        }

        public DbSet<Board> Boards { get; set; }
    }
}

