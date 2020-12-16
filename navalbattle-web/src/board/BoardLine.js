import Cellule from './Cellule';

function BoardLine({ cells, isPlayer, isClickable, onClick }) {
  return (
    <tr>
      {cells.map((cell, index) => (
        <Cellule
          isPlayer={isPlayer}
          isClickable={isClickable}
          onClick={onClick}
          cell={cell}
          key={cell.id}
        />
      ))}
    </tr>
  );
}

export default BoardLine;
