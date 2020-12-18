import WaterImage from '../images/water.jpg';
import BoatImageHorizontal from '../images/boat_h.jpg';
import BoatImageVertical from '../images/boat_v.jpg';
import DeadBoatImage from '../images/dead_boat.jpg';
import DeadNothingImage from '../images/dead_nothing.jpg';
import DeadBoatAllImage from '../images/dead_boat_all.jpg';
import HideWaterImage from '../images/hide_water.jpg';

export const GameStates = Object.freeze({
  PLACE_BOAT: -1,
  WAITING: 3,
  PLAYER2_TURN: 20,
  PLAYER2_HIT: 21,
  PLAYER2_SINK: 22,
  PLAYER2_WIN: 23,
  PLAYER1_TURN: 10,
  PLAYER1_HIT: 11,
  PLAYER1_SINK: 12,
  PLAYER1_WIN: 13,
});

export const gameStatesData = {
  [GameStates.PLACE_BOAT]: {
    text: 'Put your boat 🛳',
    button: 'I finish',
    buttonActive: false,
  },
  [GameStates.WAITING]: {
    text: 'Waiting...',
    button: 'Ready!',
    time: 5,
    buttonActive: true,
  },
  [GameStates.PLAYER2_TURN]: {
    text: 'Player 2 play ▶️',
    button: 'next',
    time: 1,
    buttonActive: true,
  },
  [GameStates.PLAYER2_HIT]: {
    text: 'Player 2 hit 💣',
    button: 'next',
    time: 2,
    buttonActive: true,
  },
  [GameStates.PLAYER2_SINK]: {
    text: 'Player 2 sink 💧',
    button: 'next',
    time: 2,
    buttonActive: true,
  },
  [GameStates.PLAYER2_WIN]: {
    text: 'Player 2 WIN 🥳',
    button: 'next',
    time: 2,
    buttonActive: false,
  },
  [GameStates.PLAYER1_TURN]: {
    text: 'Player 1 play ▶️',
    button: 'next',
    time: 1,
    buttonActive: false,
  },
  [GameStates.PLAYER1_HIT]: {
    text: 'Player 1 hit 💣',
    button: 'next',
    time: 2,
    buttonActive: true,
  },
  [GameStates.PLAYER1_SINK]: {
    text: 'Player 1 sink 💧',
    button: 'next',
    time: 2,
    buttonActive: true,
  },
  [GameStates.PLAYER1_WIN]: {
    text: 'Player 1 WIN 🥳',
    button: 'next',
    time: 2,
    buttonActive: false,
  },
};

export function getCellImage(cell, displayBoat) {
  if (cell.isDeadBoat) {
    return DeadBoatAllImage;
  }

  if (!displayBoat) {
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

export const imageDescription = {
  [DeadBoatAllImage]: 'all boat is hit',
  [BoatImageHorizontal]: 'horizontal boat',
  [BoatImageVertical]: 'vertical boat',
  [DeadBoatImage]: 'boat hit',
  [WaterImage]: 'just water...',
  [HideWaterImage]: "water with cloud... we don't see boat.",
  [DeadNothingImage]: 'hit in water... so sink...',
};
