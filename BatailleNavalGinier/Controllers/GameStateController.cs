using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BatailleNavalGinier.Models;

namespace BatailleNavalGinier.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameStateController : ControllerBase
    {
        private readonly GameController _gameController;
        private readonly CelluleController _celluleController;

        public GameStateController(GameController gameController, CelluleController celluleController)
        {
            _gameController = gameController;
            _celluleController = celluleController;
        }

        // GET: api/GameState
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/GameState/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/GameState
        [HttpPost]
        public void Post([FromBody] Cellule cellule, GameState gameState)
        {
        }

        // PUT: api/gamestate/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Game>> Put(int id, [FromBody] Cellule cellule)
        {
            Game game = _gameController.FindGameById(id);

            switch(game.GameState)
            {
                case GameState.WAITING:
                    game.GameState = GameState.PLAYER1_TURN;
                    _gameController.EditGame(game.Id, game);
                    break;
                case GameState.PLAYER1_TURN:
                    Cellule cell = _celluleController.FindCelluleById(cellule.Id);
                    if (cell == null)
                    {
                        return NoContent();
                    }

                    _celluleController.HitCellule(cell);

                    bool isWin = _gameController.IsGameWin(cellule.BoardId);

                    game.GameState = isWin ? GameState.PLAYER1_WIN : cell.IsBoat ? GameState.PLAYER1_HIT : GameState.PLAYER1_SINK;
                    _gameController.EditGame(game.Id, game);
                    break;
                case GameState.PLAYER1_HIT:
                    game.GameState = GameState.PLAYER2_TURN;
                    _gameController.EditGame(game.Id, game);
                    break;
                case GameState.PLAYER1_SINK:
                    game.GameState = GameState.PLAYER2_TURN;
                    _gameController.EditGame(game.Id, game);
                    break;
                case GameState.PLAYER2_HIT:
                    game.GameState = GameState.PLAYER1_TURN;
                    _gameController.EditGame(game.Id, game);
                    break;
                case GameState.PLAYER2_SINK:
                    game.GameState = GameState.PLAYER1_TURN;
                    _gameController.EditGame(game.Id, game);
                    break;
                case GameState.PLAYER2_TURN:
                    cell = _gameController.RunBoardIAPlay(game.Id);

                    isWin = _gameController.IsGameWin(cell.BoardId);
                    game.GameState = isWin ? GameState.PLAYER2_WIN : cell.IsBoat ? GameState.PLAYER2_HIT : GameState.PLAYER2_SINK;
                    _gameController.EditGame(game.Id, game);
                    break;
            }

            return game;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
