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

        public class PutParams
        {
            public Cellule Cellule { get; set; }
            public List<List<Cellule>> Cellules { get; set; }
            public bool CustomBoatPlace { get; set; }
        }

        // PUT: api/gamestate/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Game>> Put(int id, [FromBody] PutParams putParams)
        {
            Game game = _gameController.FindGameById(id);
            Cellule cellule = putParams.Cellule;

            switch(game.GameState)
            {
                case GameState.WAITING:
                    if (putParams.CustomBoatPlace)
                    {
                        _gameController.EditGameState(game, GameState.PLACE_BOAT);
                    } else
                    {
                        _gameController.SetRandomCellToBoard(game.Id, "player1");
                        _gameController.EditGameState(game, GameState.PLAYER1_TURN);
                    }
                    break;
                case GameState.PLACE_BOAT:
                    if (putParams.Cellules.Count == 0)
                        throw new Exception("Missing params : [List<Cellule> Cellules]");

                    foreach (List<Cellule> boat in putParams.Cellules)
                    {
                        string identificator = $"boat-{boat.Count}-{Utils.RandomString(5)}";
                        foreach (Cellule boatCell in boat)
                        {
                            boatCell.BoatIdentificator = identificator;
                            _celluleController.SafeEditCellule(boatCell);
                        }
                    }
                    _gameController.EditGameState(game, GameState.PLAYER1_TURN);
                    break;
                case GameState.PLAYER1_TURN:
                    Cellule cell = _celluleController.FindCelluleById(cellule.Id);
                    if (cell == null)
                    {
                        return NoContent();
                    }

                    _celluleController.HitCellule(cell);

                    bool isWin = _gameController.IsGameWin(cellule.BoardId);

                    _gameController.EditGameState(game,
                        isWin ? GameState.PLAYER1_WIN : cell.IsBoat ? GameState.PLAYER1_HIT : GameState.PLAYER1_SINK);
                    break;
                case GameState.PLAYER1_HIT:
                    _gameController.EditGameState(game, GameState.PLAYER2_TURN);
                    break;
                case GameState.PLAYER1_SINK:
                    _gameController.EditGameState(game, GameState.PLAYER2_TURN);
                    break;
                case GameState.PLAYER2_HIT:
                    _gameController.EditGameState(game, GameState.PLAYER1_TURN);
                    break;
                case GameState.PLAYER2_SINK:
                    _gameController.EditGameState(game, GameState.PLAYER1_TURN);
                    break;
                case GameState.PLAYER2_TURN:
                    cell = _gameController.RunBoardIAPlay(game.Id);

                    isWin = _gameController.IsGameWin(cell.BoardId);
                    _gameController.EditGameState(game,
                        isWin ? GameState.PLAYER2_WIN : cell.IsBoat ? GameState.PLAYER2_HIT : GameState.PLAYER2_SINK);
                    break;
            }

            return game;
        }
    }
}
