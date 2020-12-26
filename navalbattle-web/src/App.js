import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Routes from './Routes';
import { NavalBattleContextProvider } from './hooks/NavalBattleProvider';
import Box from './styled-components/Box';

const theme = {
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.6)',
  primary: { main: 'rgba(51,113,255,1)', light: 'rgba(51,113,255,0.5)' },
  secondary: { main: '#6c5ce7', light: 'rgba(108,92,231,0.5)' },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavalBattleContextProvider>
          <Box justifyContent="center">
            <Routes />
          </Box>
        </NavalBattleContextProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
