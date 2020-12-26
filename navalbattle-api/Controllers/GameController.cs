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
    public class GameController : ControllerBase
    {
        private readonly GameContext _context;
        private readonly BoardController _boardController;

        public GameController(GameContext context, BoardController boardController)
        {
            _context = context;
            _boardController = boardController;
        }

        // GET: api/Game
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            return await _context.Games.ToListAsync();
        }

        // GET: api/Game/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GameJson>> GetGame(long id)
        {
            var game = await _context.Games.FindAsync(id);

            if (game == null)
            {
                return NotFound();
            }


            List<BoardJson> boardStates = _boardController.GetBoardByGame(game.Id);
            GameJson gameJson = new GameJson(game, boardStates);

            return gameJson;
        }

        // POST: api/Game
        [HttpPost]
        public async Task<ActionResult<GameJson>> PostGame(Game game)
        {
            _context.Games.Add(game);
            
            await _context.SaveChangesAsync();

            var boardPlayer1 = new Board(_boardController.GetUniqueId(), game.Id, "player1");
            var boardPlayer2 = new Board(_boardController.GetUniqueId() + 1, game.Id, "player2");
            await _boardController.CreateBoard(boardPlayer1, false);
            await _boardController.CreateBoard(boardPlayer2);

            List<BoardJson> boardStates = _boardController.GetBoardByGame(game.Id);
            GameJson gameJson = new GameJson(game, boardStates);

            return gameJson;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public void EditGame(Game game)
        {
            var result = _context.Games.SingleOrDefault(g => g.Id == game.Id);
            if (result != null)
            {
                try
                {
                    _context.Games.Attach(game);
                    _context.Entry(game).State = EntityState.Modified;
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public Game FindGameById(long id)
        {
            return _context.Games.ToList().Find(g => g.Id == id);
        }


        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public void SetRandomCellToBoard(long gameId, string identifier)
        {
            _boardController.SetRandomCell(gameId, identifier);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public bool IsGameWin(long idBoard)
        {
            return _boardController.IsBoardDead(idBoard);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public Cellule RunBoardIAPlay(long idGame)
        {
            return _boardController.IAAutoPlay(idGame);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public void EditGameState(Game game, GameState gameState)
        {
            game.GameState = gameState;
            EditGame(game);
        }
    }
}
