import React from 'react';
import styled from 'styled-components';
import { useNavalBattle } from '../hooks/NavalBattleProvider';
import FloatButton from '../styled-components/FloatButton';
import Board from './Board';
import GameState from './GameState';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeTitle = styled.h2`
  font-size: 32px;
  margin: 4px;
  color: ${(props) => props.theme.textPrimary};
  text-align: center;
`;

function Game() {
  const { currentGame, onClickCellule, stopGame } = useNavalBattle();

  const currentPlayer =
    currentGame.gameState >= 10 && currentGame.gameState < 19
      ? 'player1'
      : (currentGame.gameState >= 20 && currentGame.gameState <= 29) || null;

  return (
    <Container>
      <FloatButton onClick={stopGame} />
      <HomeTitle>Player 2</HomeTitle>
      <Board
        board={currentGame.boards.player2}
        isCurrentPlayer={currentPlayer === 'player1'}
        onClick={onClickCellule}
      />
      <GameState gameState={currentGame.gameState} />
      <HomeTitle>Player 1 (you)</HomeTitle>
      <Board
        board={currentGame.boards.player1}
        isPlayer
        isCurrentPlayer={currentPlayer === 'player2'}
        onClick={onClickCellule}
      />
    </Container>
  );
}

export default Game;
