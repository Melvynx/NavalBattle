import React from 'react';
import styled from 'styled-components';
import { imageDescription } from '../board/boardServices';
import BoatImageHorizontal from '../images/boat_h.jpg';
import BoatImageVertical from '../images/boat_v.jpg';
import { isAnAcceptedCell, getPlaceBoatCellImage } from './boardCellulesServices';

const Container = styled.td`
  width: 50px;
  height: 50px;
  border: 1px solid white;
  cursor: pointer;
  display: flex;
  &:hover {
    border: 1px solid ${(props) => props?.theme?.primary.main};
  }
`;

function PlaceBoatCellule({ cell, onClick, currentBoat, maxBoatSize }) {
  if (!cell) {
    return (
      <Container>
        <span>Err.</span>
      </Container>
    );
  }

  const isAccepted = isAnAcceptedCell(cell, currentBoat, maxBoatSize);
  const image = getPlaceBoatCellImage(cell, currentBoat, isAccepted);

  function onClickHandler() {
    if (!isAccepted) return;
    if (image === BoatImageHorizontal || image === BoatImageVertical) return;
    onClick(cell);
  }

  return (
    <Container onClick={onClickHandler}>
      <img
        alt="water"
        title={imageDescription[image]}
        className="fullWidthImage"
        src={image}
      />
    </Container>
  );
}

export default PlaceBoatCellule;
