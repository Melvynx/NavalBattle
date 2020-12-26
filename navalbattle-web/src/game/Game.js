import React from 'react';
import { useHistory } from 'react-router-dom';
import { useNavalBattle } from '../hooks/NavalBattleProvider';
import FloatButton from '../styled-components/FloatButton';
import { TitleH1 } from '../styled-components/Typography';
import { GameStates } from '../board/boardServices';
import Box from '../styled-components/Box';
import Loader from '../Loader';

const PlaceBoatMenu = React.lazy(() =>
  import(/* webpackChunkName: "PlaceBoatMenu" */ '../place-boat/PlaceBoatMenu')
);

const PlaceBoat = React.lazy(() =>
  import(/* webpackChunkName: "PlaceBoat" */ '../place-boat/PlaceBoat')
);

const GameView = React.lazy(() =>
  import(/* webpackChunkName: "PlaceBoat" */ '../board/GameView')
);

function Game() {
  const { currentGame, stopGame } = useNavalBattle();
  const history = useHistory();

  if (!currentGame || !currentGame.gameState) {
    history.push('/');
    return null;
  }
  const { gameState } = currentGame;

  return (
    <Box flexDirection="column" alignItems="center">
      <TitleH1>Naval Battle {currentGame.id}</TitleH1>
      <FloatButton onClick={stopGame}>Stop</FloatButton>
      <React.Suspense fallback={<Loader />}>
        {gameState === GameStates.WAITING ? (
          <PlaceBoatMenu />
        ) : gameState === GameStates.PLACE_BOAT ? (
          <PlaceBoat />
        ) : (
          <GameView />
        )}
      </React.Suspense>
    </Box>
  );
}

export default Game;
