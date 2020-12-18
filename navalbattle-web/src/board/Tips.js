import { useRef, useState } from 'react';
import styled from 'styled-components';
import FloatButton from '../styled-components/FloatButton';

const tips = [
  'Click on [Space] key to go next!',
  'Hover image to know what they mean',
  'Click on stop to leave the game and create an other one',
];

function useTips() {
  const [tip, setTip] = useState(null);
  const [index, setIndex] = useState(0);
  const setTimeoutRef = useRef();

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

const TipContainer = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  zIndex: -10,
  flexDirection: 'column-reverse',
});

const Tip = styled.span({
  color: 'white',
  marginBottom: 16,
  marginLeft: 16,
});

function Tips() {
  const [tip, newTip] = useTips();

  return (
    <div>
      <FloatButton top={64} onClick={newTip}>
        Show tips
      </FloatButton>
      {tip && (
        <TipContainer>
          <Tip>{tip}</Tip>
        </TipContainer>
      )}
    </div>
  );
}

export default Tips;
