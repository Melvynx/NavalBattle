import React from 'react';
import styled from 'styled-components';
import { useNavalBattle } from '../hooks/NavalBattleProvider';
import useTimer from '../hooks/useTimer';
import { Button } from '../styled-components/Button';
import { gameStatesData } from './stateDatas';

const GameStateHeader = styled.h2`
  font-size: 48px;
  color: #ffffff;
  margin: 0;
`;

const Container = styled.div`
  border-radius: 2px;
  padding: 8px 32px;
  margin: 8px;
  background-color: #2c2c2c;
  display: flex;
  flex-direction: column;
`;

function GameState({ gameState }) {
  const data = gameStatesData[gameState];
  return (
    <Container>
      <GameStateHeader>{data.text}</GameStateHeader>
      {data.buttonActive && <GameStateActions data={data} />}
    </Container>
  );
}

function GameStateActions({ data }) {
  const { nextStep } = useNavalBattle();

  React.useEffect(() => {
    let onKeyDown = (e) => {
      if (e.code === 'Space') {
        nextStep();
      }
    };
    onKeyDown = onKeyDown.bind(nextStep);
    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [nextStep]);

  const handleClick = () => nextStep();

  return (
    <ButtonWithTimer state={[data.text]} onClick={handleClick} timeout={data.time}>
      {data.button}
    </ButtonWithTimer>
  );
}

function ButtonWithTimer({ state, timeout = 3, onClick, children }) {
  const { timer, startTimer } = useTimer({ timeout, onFinish: () => onClick() });

  React.useEffect(() => {
    startTimer();
  }, [state, startTimer]);

  return (
    <Button onClick={onClick}>
      {children} {timer && `(${timer})`}
    </Button>
  );
}

export default GameState;
