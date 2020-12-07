using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BatailleNavalGinier.Models
{
    public class Board
    {
        public long Id { get; set; }
        public long IdGame { get; set; }
        public string Player { get; set; }

        public Board(long id, long idGame, string player)
        {
            Id = id;
            IdGame = idGame;
            Player = player;
        }
    }
}
