import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useNavalBattle } from '../hooks/NavalBattleProvider';
import PlaceBoat from '../place-boat/PlaceBoat';
import FloatButton from '../styled-components/FloatButton';
import { TitleH1 } from '../styled-components/Typography';
import { GameStates } from './stateDatas';
import PlaceBoatMenu from '../place-boat/PlaceBoatMenu';
import GameView from './GameView';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Game() {
  const { currentGame, stopGame } = useNavalBattle();
  const history = useHistory();

  if (!currentGame || !currentGame.gameState) {
    history.push('/');
    return null;
  }
  const { gameState } = currentGame;

  return (
    <Container>
      <TitleH1>Naval Battle {currentGame.id}</TitleH1>
      <FloatButton onClick={stopGame}>Stop</FloatButton>
      {gameState === GameStates.WAITING ? (
        <PlaceBoatMenu />
      ) : gameState === GameStates.PLACE_BOAT ? (
        <PlaceBoat />
      ) : (
        <GameView />
      )}
    </Container>
  );
}

export default Game;
