import React, { useEffect } from 'react';
import useLocalStorageState from './useLocalStorageState';
import { createGame, getGame, updateGameState } from '../api/game-api';
import { gameParser } from '../utils/gameParser';
import { useHistory } from 'react-router-dom';

const NavalBattleContext = React.createContext({});

export function NavalBattleContextProvider({ children }) {
  const [currentGameId, setCurrentGameId] = useLocalStorageState('current-game-id');
  const [currentGame, setCurrentGame] = React.useState();
  const history = useHistory();

  const updateGame = React.useCallback(
    function () {
      if (currentGameId) {
        history.push('/loading');
        getGame(currentGameId).then((result) => {
          if (result) {
            setCurrentGame(gameParser(result));
            history.push('/game');
          } else {
            history.push('/');
          }
        });
      }
    },
    [currentGameId, history]
  );

  useEffect(() => {
    updateGame();
  }, [updateGame]);

  function startNewGame() {
    history.push('/loading');
    createGame().then((result) => {
      setCurrentGameId(result.game.id);
      setCurrentGame(gameParser(result));
      history.push('/game');
    });
  }

  function stopGame() {
    setCurrentGame(null);
    setCurrentGameId(null);
    history.push('/');
  }

  const nextStep = React.useCallback(
    ({ cellule = null, customBoatPlace = false, cellules = null } = {}) => {
      updateGameState(currentGameId, {
        cellule,
        customBoatPlace,
        cellules,
      }).then(() => updateGame());
    },
    [currentGameId, updateGame]
  );

  const onClickCellule = React.useCallback(
    (cellule) => {
      updateGameState(currentGameId, { cellule }).then(() => updateGame());
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
  if (!context)
    throw new Error(
      'useNavalBattle should be used within a NavalBattleContextProvider'
    );
  return context;
}
