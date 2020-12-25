namespace BatailleNavalGinier.Models
{
    public class Cellule
    {
        public long Id { get; set; }
        public long BoardId { get; set; }
        public int Xcoords { get; set; }
        public int Ycoords { get; set; }
        public bool IsBoat { get; set; }
        public bool IsHit { get; set; }
        public bool IsDeadBoat { get; set; }
        public string BoatIdentificator { get; set; }
        public Orientation Orientation { get; set; }

        public Board Board { get; set; }

        public Cellule(long id, long boardId, int xcoords, int ycoords, bool isBoat, bool isHit)
        {
            Id = id;
            BoardId = boardId;
            Xcoords = xcoords;
            Ycoords = ycoords;
            IsBoat = isBoat;
            IsHit = isHit;
            IsDeadBoat = false;
            Orientation = Orientation.Undefined;
        }

        public Cellule()
        {
        }

        public Cellule Copy()
        {
            return new Cellule(Id, BoardId, Xcoords, Ycoords, IsBoat, IsHit);
        }

        public void CopyProps(Cellule cell)
        {
            IsBoat = cell.IsBoat;
            BoatIdentificator = cell.BoatIdentificator;
            Orientation = cell.Orientation;
            IsDeadBoat = cell.IsDeadBoat;
            IsHit = cell.IsHit;
        }

        public void AddBoat(Orientation orientation, string boatIdentificator = "")
        {
            IsBoat = true;
            Orientation = orientation;
            BoatIdentificator = boatIdentificator;
        }
    }
}
