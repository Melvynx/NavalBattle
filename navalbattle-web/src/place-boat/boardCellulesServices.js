import WaterImage from '../images/water.jpg';
import BoatInterogation from '../images/boat_interogation.jpg';
import BoatImageHorizontal from '../images/boat_h.jpg';
import BoatImageVertical from '../images/boat_v.jpg';
import { getOrientation, isCellMatch } from './placeBoatServices';

export function getPlaceBoatCellImage(cell, currentBoat, isAccepted) {
  if (cell.isBoat) {
    if (cell.orientation === 1) {
      return BoatImageVertical;
    }
    return BoatImageHorizontal;
  }

  const boatMatch = currentBoat.find((boatCell) => isCellMatch(cell, boatCell));

  if (boatMatch) {
    if (cell.orientation === 1) {
      return BoatImageVertical;
    }
    return BoatImageHorizontal;
  }

  if (isAccepted) {
    return BoatInterogation;
  }

  return WaterImage;
}

export function isAnAcceptedCell(cell, currentBoat, maxBoatSize) {
  if (maxBoatSize === 0) return false;
  if (cell.isBoat) return false;

  if (currentBoat.length === 1) {
    const firstCell = currentBoat[0];
    const diff = 1;

    if (
      firstCell.xcoords - diff <= cell.xcoords &&
      firstCell.xcoords + diff >= cell.xcoords &&
      cell.ycoords === firstCell.ycoords
    )
      return true;
    if (
      firstCell.ycoords - diff <= cell.ycoords &&
      firstCell.ycoords + diff >= cell.ycoords &&
      cell.xcoords === firstCell.xcoords
    )
      return true;

    return false;
  }

  if (currentBoat.length > 1 && currentBoat.length < maxBoatSize) {
    if (currentBoat.length >= maxBoatSize) return false;

    const orientation = getOrientation(currentBoat[0], currentBoat[1]);
    const sortedCurrentBoat = currentBoat.sort((a, b) =>
      orientation === 0 ? a.xcoords - b.xcoords : a.ycoords - b.ycoords
    );

    const first = sortedCurrentBoat[0];
    const last = sortedCurrentBoat[sortedCurrentBoat.length - 1];

    if (orientation === 0) {
      if (first.xcoords - 1 === cell.xcoords && cell.ycoords === first.ycoords)
        return true;
      if (last.xcoords + 1 === cell.xcoords && cell.ycoords === last.ycoords)
        return true;
    } else if (orientation === 1) {
      if (first.ycoords - 1 === cell.ycoords && cell.xcoords === first.xcoords)
        return true;
      if (last.ycoords + 1 === cell.ycoords && cell.xcoords === last.xcoords)
        return true;
    }
    return false;
  }

  if (currentBoat.length === 0) {
    return true;
  }

  return false;
}
