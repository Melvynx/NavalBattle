import styled from 'styled-components';
import { Button } from './Button';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

// const Button = styled.button`
//   background-color: #e67e22;
//   width: 64px;
//   height: 64px;
// `;

export default function FloatButton({ ...props }) {
  return (
    <Container>
      <Button {...props}>Stop</Button>
    </Container>
  );
}
