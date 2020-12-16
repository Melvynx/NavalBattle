import React from 'react';

export default function useTimer({ timeout, onFinish }) {
  const [timer, setTimer] = React.useState(timeout);
  const intervalRef = React.useRef();

  React.useEffect(() => {
    if (timer === 0) {
      console.log('Endtimer :', timer);

      clearInterval(intervalRef.current);
      Number(timeout) && setTimer(timeout);

      onFinish();
    }
  }, [onFinish, timeout, timer]);

  const startTimer = React.useCallback(() => {
    if (!timeout) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const interval = setInterval((prev) => setTimer((prev) => prev - 1), 1000);
    intervalRef.current = interval;
  }, []);

  React.useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function reset() {
    setTimer(timeout);
  }

  return { timer, reset, startTimer };
}
