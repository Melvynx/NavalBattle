import React from 'react';
import styled from 'styled-components';

const GameStateHeader = styled.h2`
  font-size: 48px;
`;

const GameStates = Object.freeze({
  PLACE_BOAT: -1,
  PLAYER2_TURN: 20,
  PLAYER2_HIT: 21,
  PLAYER2_SINK: 22,
  PLAYER2_WIN: 23,
  PLAYER1_TURN: 10,
  PLAYER1_HIT: 11,
  PLAYER1_SINK: 12,
  PLAYER1_WIN: 13,
});

function GameState() {
  const game = {
    state: '0O',
  };
  if (game.state === GameState.PLAYER2_SINK) {
  }
  return <GameStateHeader />;
}
