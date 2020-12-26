using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BatailleNavalGinier.Models;

namespace BatailleNavalGinier.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardController : ControllerBase
    {
        private readonly BoardContext _context;
        private readonly CelluleController _celluleController;

        public BoardController(BoardContext context, CelluleController celluleController)
        {
            _context = context;
            _celluleController = celluleController;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public List<BoardJson> GetBoardByGame(long idGame)
        {
            // normaly : list of 2 items
            var boards = _context.Boards.Where(board => board.IdGame == idGame).ToList();

            BoardJson boardState1 = new BoardJson(boards.First(), _celluleController.GetCellulesByBoard(boards.First().Id));
            // remove first item to take the new second item
            boards.RemoveAt(0);
            BoardJson boardState2 = new BoardJson(boards.First(), _celluleController.GetCellulesByBoard(boards.First().Id));

            List<BoardJson> boardStates = new List<BoardJson>
            {
                boardState1,
                boardState2
            };

            return boardStates;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public async Task CreateBoard(Board board, bool randomBoat = true)
        {
            _context.Boards.Add(board);
            await _context.SaveChangesAsync();

            List<Cellule> cellules = new List<Cellule>();

            var cellCount = 0;
            for (int i = 0; i < 5; i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    Cellule cell = new Cellule(_celluleController.GetUniqueId() + cellCount, board.Id, j, i, false, false);
                    cellules.Add(cell);
                    cellCount++;
                }
            }

            if (randomBoat)
            {
                new BoardGeneratorControllerV2().SetRandomBoat(cellules);
            }

            foreach (Cellule cell in cellules)
            {
                await _celluleController.CreateCellule(cell);
            }
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public long GetUniqueId()
        {
            if (_context.Boards.Any())
            {
                return _context.Boards.Last().Id + 1;
            } else
            {
                return 1;
            }
        }


        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public bool IsBoardDead(long boardId)
        {
            var cells = _celluleController.GetCellulesByBoard(boardId);
            // true - !false
            return !cells.Any(c => c.IsBoat && !c.IsHit);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public Cellule IAAutoPlay(long idGame)
        {
            Board board = _context.Boards.ToList().Find(b => b.IdGame == idGame && b.Player == "player1");
            if (board == null)
            {
                throw new Exception("Invalid idGame");
            }

            var cellules = _celluleController.GetCellulesByBoard(board.Id);

            var result = new IAPlayerController().RunIA(cellules);
            //var result = cellules[Utils.RandomNumber(0, cellules.Count - 1)];
            _celluleController.HitCellule(result);

            return result;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public void SetRandomCell(long gameId, string identifier)
        {
            var boards = _context.Boards.ToList().FindAll(b => b.IdGame == gameId);
            Board board = boards.FirstOrDefault(b => b.Player == identifier);
            _celluleController.SetRandomBoatToCells(board.Id);
        }
    }
}
