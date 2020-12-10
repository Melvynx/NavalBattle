import Cellule from './Cellule';

function BoardLine({ cells, currentPlayer }) {
  return (
    <tr>
      {cells.map((cell, index) => (
        <Cellule currentPlayer={currentPlayer} cell={cell} key={cell.id} />
      ))}
    </tr>
  );
}

export default BoardLine;
