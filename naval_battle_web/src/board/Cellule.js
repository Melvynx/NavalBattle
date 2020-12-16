import React from 'react';
import styled from 'styled-components';
import WaterImage from '../images/water.jpg';
import BoatImageHorizontal from '../images/boat_h.jpg';
import BoatImageVertical from '../images/boat_v.jpg';
import DeadBoatImage from '../images/dead_boat.jpg';
import DeadNothingImage from '../images/dead_nothing.jpg';
import DeadBoatAllImage from '../images/dead_boat_all.jpg';
import HideWaterImage from '../images/hide_water.jpg';

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

function getImage(cell, isPlayer) {
  if (cell.isDeadBoat) {
    return DeadBoatAllImage;
  }

  if (!isPlayer) {
    if (cell.isHit) {
      return cell.isBoat ? DeadBoatImage : DeadNothingImage;
    } else {
      return HideWaterImage;
    }
  }

  if (cell.isBoat) {
    if (cell.isHit) {
      return DeadBoatImage;
    }
    if (cell.orientation === 1) {
      return BoatImageVertical;
    }
    return BoatImageHorizontal;
  } else {
    if (cell.isHit) {
      return DeadNothingImage;
    }
    return WaterImage;
  }
}

function Cellule({ cell, isPlayer, onClick, isClickable }) {
  if (!cell) {
    return (
      <Container>
        <span>Err.</span>
      </Container>
    );
  }

  return (
    <Container
      onClick={() => isClickable && onClick(cell)}
      isClickable={isClickable}
    >
      <img
        alt="water"
        title="just water..."
        style={{ width: '100%', height: '100%' }}
        src={getImage(cell, isPlayer)}
      />
    </Container>
  );
}

export default Cellule;
