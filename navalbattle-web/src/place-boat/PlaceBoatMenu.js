import React from 'react';
import styled from 'styled-components';
import { useNavalBattle } from '../hooks/NavalBattleProvider';
import { Button } from '../styled-components/Button';
import { TitleH2 } from '../styled-components/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function PlaceBoatMenu() {
  const { nextStep } = useNavalBattle();
  return (
    <Container>
      <TitleH2>Do you want to place your boats?</TitleH2>
      <Button color="primary" onClick={() => nextStep({ customBoatPlace: true })}>
        Yes, I want to place my boats
      </Button>
      <Button
        margin="8px 0"
        color="secondary"
        onClick={() => nextStep({ customBoatPlace: false })}
      >
        No, I prefer that you place them randomly.
      </Button>
    </Container>
  );
}
