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

        // GET: api/Board
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Board>>> GetBoards()
        {
            return await _context.Boards.ToListAsync();
        }

        // GET: api/Board/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Board>> GetBoard(long id)
        {
            var board = await _context.Boards.FindAsync(id);

            if (board == null)
            {
                return NotFound();
            }

            return board;
        }

        // PUT: api/Board/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBoard(long id, Board board)
        {
            if (id != board.Id)
            {
                return BadRequest();
            }

            _context.Entry(board).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BoardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Board
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Board>> PostBoard(Board board)
        {
            
            _context.Boards.Add(board);
            await _context.SaveChangesAsync();


            for (int i = 0; i < 5; i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    Cellule cex = new Cellule(1, board.Id, j, i, false, false);
                    await _celluleController.PostCellule(cex);
                }

            }

            return CreatedAtAction("GetBoard", new { id = board.Id }, board);
        }

        // DELETE: api/Board/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Board>> DeleteBoard(long id)
        {
            var board = await _context.Boards.FindAsync(id);
            if (board == null)
            {
                return NotFound();
            }

            _context.Boards.Remove(board);
            await _context.SaveChangesAsync();

            return board;
        }

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

        private bool BoardExists(long id)
        {
            return _context.Boards.Any(e => e.Id == id);
        }

    }
}
