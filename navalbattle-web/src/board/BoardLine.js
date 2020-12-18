import Cellule from './Cellule';

function BoardLine({ cells, displayBoat, isClickable, onClick }) {
  return (
    <tr>
      {cells.map((cell, index) => (
        <Cellule
          displayBoat={displayBoat}
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
