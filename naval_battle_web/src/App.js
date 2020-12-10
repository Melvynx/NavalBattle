import styled, { ThemeProvider } from 'styled-components';
import './App.css';
import Home from './Home';
import { NavalBattleContextProvider } from './hooks/NavalBattleProvider';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const theme = {
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.6)',
  primary: { main: 'rgba(51,113,255,1)', light: 'rgba(51,113,255,0.5)' },
  secondary: { main: '#6c5ce7', light: 'rgba(108,92,231,0.5)' },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavalBattleContextProvider>
        <Container>
          <Home />
        </Container>
      </NavalBattleContextProvider>
    </ThemeProvider>
  );
}

export default App;
