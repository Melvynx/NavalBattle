import React from 'react';
import { useNavalBattle } from '../hooks/NavalBattleProvider';
import Box from '../styled-components/Box';
import { Button } from '../styled-components/Button';
import { TitleH2 } from '../styled-components/Typography';

export default function PlaceBoatMenu() {
  const { nextStep } = useNavalBattle();
  return (
    <Box flexDirection="column">
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
    </Box>
  );
}
