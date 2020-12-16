using System;
using System.Collections.Generic;

namespace BatailleNavalGinier.Models
{
    public class GameJson
    {
        public Game Game { get; set; }
        public List<BoardJson> BoardStates { get; set; }

        public GameJson()
        {
        }

        public GameJson(Game game, List<BoardJson> boardStates)
        {
            Game = game;
            BoardStates = boardStates;
        }
    }
}
