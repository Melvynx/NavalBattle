import { useNavalBattle } from '../hooks/NavalBattleProvider';

function Game() {
  const { currentGame, startNewGame } = useNavalBattle();
  return (
    <div>
      {Boolean(currentGame) ? (
        <p>current game is {currentGame}</p>
      ) : (
        <button onClick={startNewGame}>Start new game</button>
      )}
    </div>
  );
}

export default Game;
