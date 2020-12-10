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

function Board({ board, currentPlayer }) {
  // console.log('board:', board);
  return (
    <Container>
      <table>
        <TableContainer>
          {board.cellules.map((cells, i) => (
            <BoardLine
              currentPlayer={currentPlayer}
              cells={cells}
              key={`${cells[0].id}${i}`}
            />
          ))}
        </TableContainer>
      </table>
    </Container>
  );
}

export default Board;
