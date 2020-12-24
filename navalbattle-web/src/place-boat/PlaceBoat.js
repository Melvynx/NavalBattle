import React from 'react';
import styled from 'styled-components';
import { useNavalBattle } from '../hooks/NavalBattleProvider';
import usePlaceBoat from '../hooks/usePlaceBoat';
import { Body } from '../styled-components/Typography';
import PlaceBoatBoard from './PlaceBoatBoard';
import PlaceBoatConfirm from './PlaceBoatConfirm';

const Container = styled.div({
  maxWidth: 310,
});

export default function PlaceBoat() {
  const { currentGame, nextStep } = useNavalBattle();
  const player1 = currentGame.boards.player1;

  const {
    currentBoat,
    addCellToBoat,
    maxBoatSize,
    remainingBoat,
    confirmActions,
    board,
  } = usePlaceBoat({ board: player1, onFinish: nextStep });

  return (
    <Container>
      <Body margin="8px 0">
        Place your boats by clicking on the grey boats then click on "add this boat"
        when you have finished one.
      </Body>
      <PlaceBoatBoard
        board={board}
        currentBoat={currentBoat}
        onClick={addCellToBoat}
        maxBoatSize={maxBoatSize}
      />
      <PlaceBoatConfirm
        remainingBoat={remainingBoat}
        currentBoat={currentBoat}
        confirmActions={confirmActions}
      />
    </Container>
  );
}
