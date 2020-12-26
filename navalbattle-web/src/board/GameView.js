import React from 'react';
import { useNavalBattle } from '../hooks/NavalBattleProvider';
import { TitleH2 } from '../styled-components/Typography';
import Board from './Board';
import { GameStates } from './boardServices';
import GameState from '../game/GameState';
import Tips from './Tips';

function GameView() {
  const { currentGame, onClickCellule } = useNavalBattle();

  const { gameState } = currentGame;

  const currentPlayer =
    gameState >= 10 && gameState < 19
      ? 'player1'
      : (gameState >= 20 && gameState <= 29) || null;

  return (
    <>
      <Tips />
      <TitleH2>Player 2</TitleH2>
      <Board
        board={currentGame.boards.player2}
        displayBoat={[GameStates.PLAYER1_WIN, GameStates.PLAYER2_WIN].includes(
          gameState
        )}
        isCurrentPlayer={currentPlayer === 'player1'}
        onClick={onClickCellule}
      />
      <GameState gameState={currentGame.gameState} />
      <TitleH2>Player 1 (you)</TitleH2>
      <Board
        board={currentGame.boards.player1}
        displayBoat
        isCurrentPlayer={currentPlayer === 'player2'}
        onClick={onClickCellule}
      />
    </>
  );
}

export default GameView;
