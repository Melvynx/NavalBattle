import React, { useState } from 'react';
import useLocalStorageState from './useLocalStorageState';
import { createGame } from '../api/game-api';

const NavalBattleContext = React.createContext({});

export function NavalBattleContextProvider({ children }) {
  const [currentGame, setCurrentGame] = useLocalStorageState(
    'current-naval-battle-id'
  );

  function startNewGame() {
    createGame().then(setCurrentGame);
  }

  const values = { currentGame, startNewGame };

  return (
    <NavalBattleContext.Provider value={values}>
      {children}
    </NavalBattleContext.Provider>
  );
}

export function useNavalBattle() {
  const context = React.useContext(NavalBattleContext);
  if (!context) {
    throw new Error(
      'useNavalBattle should be used within a NavalBattleContextProvider'
    );
  }
  return context;
}
