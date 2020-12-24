import React from 'react';
import styled from 'styled-components';
import { getCellImage, imageDescription } from './datas';

const Container = styled.td`
  width: 50px;
  height: 50px;
  border: 1px solid white;
  display: flex;
  &:hover {
    ${(props) =>
      props.isClickable && {
        cursor: 'pointer',
      }}
    border: 1px solid ${(props) => props?.theme?.primary.main}
  }
`;

function Cellule({ cell, displayBoat, onClick, isClickable }) {
  if (!cell) {
    return (
      <Container>
        <span>Err.</span>
      </Container>
    );
  }

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
// OUI
// OUI

export default Cellule;
