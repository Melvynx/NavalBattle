import React from 'react';
import Box from '../styled-components/Box';
import BoardLine from './BoardLine';

function Board({ board, displayBoat, isCurrentPlayer, onClick }) {
  return (
    <Box flexDirection="column" alignItems="center">
      <table style={{ borderCollapse: 'collapse' }}>
        <Box>
          {board.cellules.map((cells, i) => (
            <BoardLine
              onClick={onClick}
              displayBoat={displayBoat}
              cells={cells}
              isClickable={isCurrentPlayer}
              key={`${cells[0].id}${i}`}
            />
          ))}
        </Box>
      </table>
    </Box>
  );
}

export default Board;
