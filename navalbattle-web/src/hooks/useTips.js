import React from 'react';

const tips = [
  'Click on [Space] key to go next!',
  'Hover image to know what they mean',
  'Click on stop to leave the game and create an other one',
  'You are the player 1, so you need to shoot on the board of the player 2 !',
];

function useTips() {
  const [tip, setTip] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  const setTimeoutRef = React.useRef();

  function newTip() {
    clearTimeout(setTimeoutRef.current);

    setTip(tips[index]);
    setIndex((p) => {
      const r = p + 1;
      if (r > tips.length - 1) {
        return 0;
      }
      return r;
    });

    const timeout = setTimeout(() => setTip(null), 6000);
    setTimeoutRef.current = timeout;
  }

  return [tip, newTip];
}

export default useTips;
