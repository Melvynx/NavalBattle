import React from 'react';
import styled from 'styled-components';
import { useNavalBattle } from '../hooks/NavalBattleProvider';
import useTimer from '../hooks/useTimer';
import { Button } from '../styled-components/Button';

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

const GameStates = Object.freeze({
  PLACE_BOAT: -1,
  WAITING: 3,
  PLAYER2_TURN: 20,
  PLAYER2_HIT: 21,
  PLAYER2_SINK: 22,
  PLAYER2_WIN: 23,
  PLAYER1_TURN: 10,
  PLAYER1_HIT: 11,
  PLAYER1_SINK: 12,
  PLAYER1_WIN: 13,
});

const sentences = {
  '-1': 'Put your boat 🛳',
  3: 'Waiting...',
  20: 'Player2 play ▶️',
  21: 'Player2 hit 💣',
  22: 'Player 2 sink 💧',
  23: 'Player2 WIN 🥳',
  10: 'Player1 play ▶️',
  11: 'Player1 hit 💣',
  12: 'Player1 sink 💧',
  13: 'Player1 WIN 🥳',
};

function GameState({ gameState }) {
  return (
    <Container>
      <GameStateHeader>{sentences[gameState]}</GameStateHeader>
      {[3, 20, 21, 22, 23, 10, 11, 12, 13].includes(gameState) && (
        <GameStateActions gameState={gameState} />
      )}
    </Container>
  );
}

const actionsSentences = {
  '-1': 'I had finish',
  3: 'Ready!',
  20: 'Next',
  21: 'Next',
  22: 'Next',
  23: 'Next',
  10: 'Next',
  11: 'Next',
  12: 'Next',
  13: 'Next',
};

const acceptedState = [
  GameStates.WAITING,
  GameStates.PLAYER1_SINK,
  GameStates.PLAYER1_HIT,
  GameStates.PLAYER2_HIT,
  GameStates.PLAYER2_SINK,
  GameStates.PLAYER2_TURN,
];

function GameStateActions({ gameState }) {
  const { nextStep } = useNavalBattle();

  const displayActions = acceptedState.includes(gameState);

  React.useEffect(() => {
    console.log('rerender here');
    if (!displayActions) return;

    let onKeyDown = (e) => {
      if (e.code === 'Space') {
        nextStep();
      }
    };
    onKeyDown = onKeyDown.bind(nextStep);
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [displayActions, nextStep]);

  const handleClick = () => nextStep();

  const sentence = actionsSentences[gameState];

  if (!displayActions) {
    return null;
  }

  return (
    <ButtonWithTimer
      state={[gameState]}
      onClick={handleClick}
      timeout={sentence === 'Next' ? 2 : null}
    >
      {sentence}
    </ButtonWithTimer>
  );
}

function ButtonWithTimer({ state, timeout = 3, onClick, children }) {
  const { timer, startTimer } = useTimer({ timeout, onFinish: () => {} });

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
