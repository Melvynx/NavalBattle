import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useNavalBattle } from '../hooks/NavalBattleProvider';
import FloatButton from '../styled-components/FloatButton';
import Board from './Board';
import { GameStates } from './datas';
import GameState from './GameState';
import Tips from './Tips';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlayerTitle = styled.h2`
  font-size: 32px;
  margin: 4px;
  color: ${(props) => props.theme.textPrimary};
  text-align: center;
`;

const GameTitle = styled.h1`
  font-size: 48px;
  margin: 8px;
  color: white;
  text-align: center;
`;

function Game() {
  const { currentGame, onClickCellule, stopGame } = useNavalBattle();
  const history = useHistory();

  if (!currentGame || !currentGame.gameState) {
    history.push('/');
    return null;
  }
  const { gameState } = currentGame;

  const currentPlayer =
    gameState >= 10 && gameState < 19
      ? 'player1'
      : (gameState >= 20 && gameState <= 29) || null;

  return (
    <Container>
      <GameTitle>Naval Battle {currentGame.id}</GameTitle>
      <FloatButton onClick={stopGame}>Stop</FloatButton>
      <Tips />
      <PlayerTitle>Player 2</PlayerTitle>
      <Board
        board={currentGame.boards.player2}
        displayBoat={[GameStates.PLAYER1_WIN, GameStates.PLAYER2_WIN].includes(
          gameState
        )}
        isCurrentPlayer={currentPlayer === 'player1'}
        onClick={onClickCellule}
      />
      <GameState gameState={currentGame.gameState} />
      <PlayerTitle>Player 1 (you)</PlayerTitle>
      <Board
        board={currentGame.boards.player1}
        displayBoat
        isCurrentPlayer={currentPlayer === 'player2'}
        onClick={onClickCellule}
      />
    </Container>
  );
}

export default Game;
