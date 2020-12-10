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
