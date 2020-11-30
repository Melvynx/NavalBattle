namespace BatailleNavalGinier.Models
{
    public class Cellule
    {
        public long Id { get; set; }
        public long IdBoard { get; set; }
        public int Xcoords { get; set; }
        public int Ycoords { get; set; }
        public bool IsBoat { get; set; }
        public bool IsHit { get; set; }
    }
}
