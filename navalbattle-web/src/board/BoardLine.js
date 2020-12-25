import Cellule from './Cellule';

function BoardLine({ cells, displayBoat, isClickable, onClick }) {
  return (
    <tr>
      {cells.map((cell, index) => (
        <Cellule
          displayBoat={displayBoat}
          isClickable={isClickable}
          onClick={onClick}
          isHit={cell.isHit}
          isBoat={cell.isBoat}
          isDeadBoat={cell.isDeadBoat}
          orientation={cell.orientation}
          id={cell.id}
          boardId={cell.boardId}
          key={cell.id}
        />
      ))}
    </tr>
  );
}

export default BoardLine;
