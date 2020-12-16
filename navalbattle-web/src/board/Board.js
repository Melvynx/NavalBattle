import React from 'react';
import styled from 'styled-components';
import BoardLine from './BoardLine';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableContainer = styled.tbody`
  display: flex;
`;

function Board({ board, isPlayer, isCurrentPlayer, onClick }) {
  return (
    <Container>
      <table>
        <TableContainer>
          {board.cellules.map((cells, i) => (
            <BoardLine
              onClick={onClick}
              isPlayer={isPlayer}
              cells={cells}
              isClickable={isCurrentPlayer}
              key={`${cells[0].id}${i}`}
            />
          ))}
        </TableContainer>
      </table>
    </Container>
  );
}

export default Board;
