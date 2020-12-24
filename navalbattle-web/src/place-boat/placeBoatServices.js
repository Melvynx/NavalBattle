export function getOrientation(cell1, cell2) {
  if (cell1.xcoords === cell2.xcoords) return 1; // vertical
  if (cell1.ycoords === cell2.ycoords) return 0; // horizontal
  return -1;
}

export function isCellMatch(cell1, cell2) {
  if (cell1.xcoords !== cell2.xcoords) return false;
  if (cell1.ycoords !== cell2.ycoords) return false;
  return true;
}
