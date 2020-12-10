using System;
using System.Collections.Generic;

namespace BatailleNavalGinier.Models
{
    public class BoardJson
    {
        public Board board { get; set; }
        public List<Cellule> cellules { get; set; }

        public BoardJson()
        {
        }

        public BoardJson(Board board, List<Cellule> cellules)
        {
            this.board = board;
            this.cellules = cellules;
        }
    }
}
