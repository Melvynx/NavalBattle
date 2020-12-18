export function gameParser(_game) {
  const { game, boardStates } = _game;

  const parseGame = { ...game };

  parseGame.boards = {
    player1: parseBoard(boardStates, 'player1'),
    player2: parseBoard(boardStates, 'player2'),
  };

  return parseGame;
}

function parseBoard(boardStates, player) {
  const { board, cellules } = boardStates.find((e) => e.board.player === player);

  const parseBoard = { ...board };
  parseBoard.cellules = parseCellules(cellules);

  return parseBoard;
}

function parseCellules(cellules) {
  const localCellules = [];

  for (let i = 0; i < 5; i++) {
    localCellules.push(
      cellules
        .filter((cell) => cell.xcoords === i)
        .sort((prev, current) => prev.ycoords > current.ycoords)
    );
  }

  // cellules.reduce(() => {}, []);

  return localCellules;
}
