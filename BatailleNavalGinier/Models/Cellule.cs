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
        public Orientation Orientation { get; set; }

        public Cellule(long id, long idBoard, int xcoords, int ycoords, bool isBoat, bool isHit)
        {
            Id = id;
            IdBoard = idBoard;
            Xcoords = xcoords;
            Ycoords = ycoords;
            IsBoat = isBoat;
            IsHit = isHit;
            Orientation = Orientation.Undefined;
        }

        public void AddBoat(Orientation orientation)
        {
            IsBoat = true;
            Orientation = orientation;
        }
    }
}
