import React from 'react';
import styled from 'styled-components';
import PlaceBoatCellule from './PlaceBoatCellule';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableContainer = styled.tbody`
  display: flex;
`;

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
    <Container>
      <table>
        <TableContainer>
          {board.cellules.map((cells, i) => (
            <PlaceBoatBoardLine
              currentBoat={currentBoat}
              onClick={onClick}
              cells={cells}
              key={`${cells[0].id}${i}`}
              maxBoatSize={maxBoatSize}
            />
          ))}
        </TableContainer>
      </table>
    </Container>
  );
}

export default PlaceBoatBoard;
