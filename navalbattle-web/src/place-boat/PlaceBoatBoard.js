import React from 'react';
import Box from '../styled-components/Box';
import PlaceBoatCellule from './PlaceBoatCellule';

export function PlaceBoatBoardLine({
  cells,
  currentBoat,
  onClick,
  maxBoatSize,
  CelluleComponent = PlaceBoatCellule,
}) {
  return (
    <tr>
      {cells.map((cell, index) => (
        <CelluleComponent
          onClick={onClick}
          cell={cell}
          currentBoat={currentBoat}
          key={cell.id}
          maxBoatSize={maxBoatSize}
        />
      ))}
    </tr>
  );
}

function PlaceBoatBoard({ board, onClick, currentBoat, maxBoatSize }) {
  return (
    <Box flexDirection="column" alignItems="center">
      <table>
        <Box>
          {board.cellules.map((cells, i) => (
            <PlaceBoatBoardLine
              currentBoat={currentBoat}
              onClick={onClick}
              cells={cells}
              key={`${cells[0].id}${i}`}
              maxBoatSize={maxBoatSize}
            />
          ))}
        </Box>
      </table>
    </Box>
  );
}

export default PlaceBoatBoard;
