import React, { useEffect } from 'react';
import useLocalStorageState from './useLocalStorageState';
import { createGame, getGame } from '../api/game-api';
import { gameParser } from '../utils/gameParser';

const NavalBattleContext = React.createContext({});

export function NavalBattleContextProvider({ children }) {
  const [currentGameId, setCurrentGameId] = useLocalStorageState('current-game-id');
  const [currentGame, setCurrentGame] = React.useState();

  function startNewGame() {
    createGame().then((result) => {
      // setCurrentGameId(result.game.id);

      setCurrentGame(gameParser(result));
    });
  }

  useEffect(() => {
    if (currentGameId) {
      getGame(currentGameId).then((result) => {
        result && setCurrentGame(gameParser(result));
      });
    }
    // we want call only on render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
