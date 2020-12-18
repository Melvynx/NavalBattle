import styled from 'styled-components';
import { Button } from './Button';

const Container = styled.div(
  {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  ({ top, left }) => ({
    top: top || 0,
    left: left || 0,
  })
);

export default function FloatButton({ ...props }) {
  return (
    <Container top={props.top} left={props.left}>
      <Button {...props} />
    </Container>
  );
}
