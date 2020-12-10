import React from 'react';
import styled from 'styled-components';
import { useNavalBattle } from '../hooks/NavalBattleProvider';
import Board from './Board';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeTitle = styled.h1`
  font-size: 32px;
  margin: 8px;
  color: ${(props) => props.theme.textPrimary};
  text-align: center;
`;

function Game() {
  const { currentGame } = useNavalBattle();
  return (
    <Container>
      <HomeTitle>Player 2</HomeTitle>
      <Board board={currentGame.boards.player2} />
      <HomeTitle>Player 1 (you)</HomeTitle>
      <Board board={currentGame.boards.player1} currentPlayer />
    </Container>
  );
}

export default Game;
