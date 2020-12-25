import styled from 'styled-components';
import useTips from '../hooks/useTips';
import FloatButton from '../styled-components/FloatButton';

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
