import { stringifyJson } from '../utils/localStorage';
import { ACCEPTED_STATUS, API_URL } from './info';

export function createGame(name = 'random-game') {
  return fetch(`${API_URL}/game`, {
    method: 'POST',
    body: JSON.stringify({ name: name }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((result) => {
    if (ACCEPTED_STATUS.includes(result.status)) {
      return result.json();
    } else {
      return result;
    }
  });
}

export function getGame(id) {
  return fetch(`${API_URL}/game/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then((result) => {
    if (ACCEPTED_STATUS.includes(result.status)) {
      return result.json();
    } else {
      return;
    }
  });
}

const fakeCell = {
  id: 0,
  idBoard: 0,
  xcoords: 0,
  ycoords: 0,
  isBoat: false,
  isHit: false,
  orientation: 0,
};

export function updateGameState(id, cell) {
  let body = stringifyJson(cell || fakeCell);

  return fetch(`${API_URL}/gamestate/${id}`, {
    method: 'PUT',
    body: body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((result) => {
    if (ACCEPTED_STATUS.includes(result.status)) {
      return result.json();
    } else {
      return;
    }
  });
}
