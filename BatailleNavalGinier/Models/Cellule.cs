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

        public Cellule(long id, long idboard, int xcoords, int ycoords, bool isboat, bool ishit)
        {
            this.Id = id;
            this.IdBoard = idboard;
            this.Xcoords = xcoords;
            this.Ycoords = ycoords;
            this.IsBoat = isboat;
            this.IsHit = ishit;
        }
    }
}
