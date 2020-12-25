import React from 'react';
import styled from 'styled-components';
import { getCellImage, imageDescription } from './stateDatas';

const Container = styled.td`
  width: 50px;
  height: 50px;
  border: 1px solid #5cc1ef;
  display: flex;
  cursor: ${(props) => props.isClickable && 'pointer'};
  &:hover {
    border: 1px solid ${(props) => props?.theme?.primary.main};
  }
`;
// I pass native props for not render component on change
function Cellule({
  isHit,
  isBoat,
  isDeadBoat,
  orientation,
  displayBoat,
  id,
  boardId,
  onClick,
  isClickable,
}) {
  const cell = { id, isHit, isBoat, isDeadBoat, orientation, boardId };

  if (!cell)
    return (
      <Container>
        <span>Err.</span>
      </Container>
    );

  const image = getCellImage(cell, displayBoat);

  return (
    <Container
      onClick={() => isClickable && !cell.isHit && onClick?.(cell)}
      isClickable={isClickable}
    >
      <img
        alt="water"
        title={imageDescription[image]}
        className="fullWidthImage"
        src={image}
      />
    </Container>
  );
}

export default React.memo(Cellule);
