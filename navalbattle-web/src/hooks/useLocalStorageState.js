import React from 'react';
import { getItemLocalStorage } from '../utils/localStorage';

export default function useLocalStorageState(localStorageKey, defaultValue) {
  const states = React.useState(() => {
    const item = getItemLocalStorage(localStorageKey, defaultValue);
    if (item) {
      return item;
    } else {
      localStorage.removeItem(localStorageKey);
      return null;
    }
  });
  const [state] = states;

  const prevKeyRef = React.useRef(localStorageKey);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;

    if (prevKey !== localStorageKey) {
      localStorage.removeItem(prevKey);
    }

    prevKeyRef.current = localStorageKey;
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state, localStorageKey]);

  return states;
}
