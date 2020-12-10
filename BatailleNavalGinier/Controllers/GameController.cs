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

        // PUT: api/Game/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGame(long id, Game game)
        {
            if (id != game.Id)
            {
                return BadRequest();
            }

            _context.Entry(game).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(id))
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

        // POST: api/Game
        [HttpPost]
        public async Task<ActionResult<GameJson>> PostGame(Game game)
        {
            _context.Games.Add(game);
            
            await _context.SaveChangesAsync();

            var boardPlayer1 = new Board(_boardController.GetUniqueId(), game.Id, "player1");
            var boardPlayer2 = new Board(_boardController.GetUniqueId() + 1, game.Id, "player2");
            await _boardController.CreateBoard(boardPlayer1);
            await _boardController.CreateBoard(boardPlayer2);

            List<BoardJson> boardStates = _boardController.GetBoardByGame(game.Id);
            GameJson gameJson = new GameJson(game, boardStates);

            return gameJson;
        }

        // DELETE: api/Game/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Game>> DeleteGame(long id)
        {
            var game = await _context.Games.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }

            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            return game;
        }

        private bool GameExists(long id)
        {
            return _context.Games.Any(e => e.Id == id);
        }
    }
}
