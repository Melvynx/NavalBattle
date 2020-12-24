import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useNavalBattle } from '../hooks/NavalBattleProvider';
import PlaceBoat from '../place-boat/PlaceBoat';
import FloatButton from '../styled-components/FloatButton';
import { TitleH2 } from '../styled-components/Typography';
import Board from './Board';
import { GameStates } from './datas';
import GameState from './GameState';
import PlaceBoatMenu from '../place-boat/PlaceBoatMenu';
import Tips from './Tips';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
      <FloatButton top={-4} left={-4} onClick={stopGame}>
        Stop
      </FloatButton>
      {gameState === GameStates.WAITING ? (
        <PlaceBoatMenu />
      ) : gameState === GameStates.PLACE_BOAT ? (
        <PlaceBoat />
      ) : (
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
      )}
    </Container>
  );
}

export default Game;
