using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BatailleNavalGinier.Models
{
    public class Cellule
    {
        public long Id { get; set; }
        public long IdBoard { get; set; }
        public int Xcoords { get; set; }
        public int Ycoords { get; set; }
        public bool is_boat { get; set; }
        public bool is_hit { get; set; }
    }
}
