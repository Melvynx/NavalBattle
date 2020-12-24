import React from 'react';
import { getOrientation } from '../place-boat/placeBoatServices';

export default function usePlaceBoat({
  board: boardProps,
  onFinish: onFinishProps,
}) {
  // list of list of cellule (for boat) -> directly send to api
  const [boats, setBoats] = React.useState([]);
  // saved board to place boat
  const [board, setBoard] = React.useState(boardProps);
  // list of cellules for the current boat
  const [boat, setBoat] = React.useState([]);
  const [remainingBoat, setRemainingBoat] = React.useState([2, 2, 3]);

  function addCellToBoat(cell) {
    let copyBoat = [...boat];
    if (boat.length !== 0) {
      const orientation = getOrientation(boat[0], cell);
      if (copyBoat[0].orientation === -1) {
        copyBoat = copyBoat.map((b) => {
          b.orientation = orientation;
          return b;
        });
      }
      cell.orientation = orientation;
    }
    setBoat([...copyBoat, cell]);
  }

  function confirmBoat() {
    setBoats([...boats, boat]);

    const boatLength = boat.length;
    const copyRemainingBoat = [...remainingBoat];
    const index = copyRemainingBoat.findIndex((p) => p === boatLength);
    if (index > -1) {
      copyRemainingBoat.splice(index, 1);
    }
    setRemainingBoat(copyRemainingBoat);

    const copyBoard = { ...board };
    // edit new boat cell to be display as boat
    boat.forEach((cell) => {
      copyBoard.cellules[cell.xcoords][cell.ycoords].isBoat = true;
    });
    setBoard(copyBoard);

    setBoat([]);
  }

  function cancelBoat() {
    setBoat([]);
  }

  function onFinish() {
    onFinishProps({ cellules: boats });
  }

  const maxBoatSize = remainingBoat.reduce((p, a) => (p > a ? p : a), 0);

  return {
    currentBoat: boat,
    addCellToBoat,
    maxBoatSize,
    remainingBoat,
    confirmActions: {
      cancelBoat,
      confirmBoat,
      onFinish,
    },
    board,
  };
}
