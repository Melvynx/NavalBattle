import React from 'react';
import styled from 'styled-components';
import Box from './styled-components/Box';
import BeanSpinner from './images/bean-spinner.svg';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

export default function Loader({ fullScreen }) {
  return (
    <Container>
      <Box lexDirection="column" alignItems="center">
        <img src={BeanSpinner} alt="spinner" />
      </Box>
    </Container>
  );
}
