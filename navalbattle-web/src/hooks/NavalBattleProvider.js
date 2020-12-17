import React, { useEffect } from 'react';
import useLocalStorageState from './useLocalStorageState';
import { createGame, getGame, updateGameState } from '../api/game-api';
import { gameParser } from '../utils/gameParser';

const NavalBattleContext = React.createContext({});

export function NavalBattleContextProvider({ children }) {
  const [currentGameId, setCurrentGameId] = useLocalStorageState('current-game-id');
  const [currentGame, setCurrentGame] = React.useState();

  const updateGame = React.useCallback(
    function () {
      if (currentGameId) {
        getGame(currentGameId).then((result) => {
          result && setCurrentGame(gameParser(result));
        });
      }
    },
    [currentGameId]
  );

  useEffect(() => {
    updateGame();
  }, [updateGame]);

  function startNewGame() {
    createGame().then((result) => {
      setCurrentGameId(result.game.id);

      setCurrentGame(gameParser(result));
    });
  }

  function stopGame() {
    setCurrentGame(null);
    setCurrentGameId(null);
  }

  const nextStep = React.useCallback((cell = null) => {
    updateGameState(currentGameId, cell).then(() => updateGame());
  }, [currentGameId, updateGame])

  const onClickCellule = React.useCallback(
    (cell) => {
      updateGameState(currentGameId, cell).then(() => updateGame());
    },
    [currentGameId, updateGame]
  );

  const values = { currentGame, startNewGame, nextStep, onClickCellule, stopGame };

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
