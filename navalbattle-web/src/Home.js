import styled from 'styled-components';
import Game from './board/Game';
import { useNavalBattle } from './hooks/NavalBattleProvider';
import { Button } from './styled-components/Button';

const Container = styled.div`
  justify-content: center;
  margin: 0 16px 16px 16px;
  display: flex;
  max-width: 960px;
  flex-direction: column;
`;

const HomeTitle = styled.h1`
  font-size: 64px;
  margin: 16px;
  color: white;
  text-align: center;
`;

const HomeInfo = styled.p`
  margin-bottom: 16px;
  margin-top: 8px;
  color: white;
  text-align: center;
`;

function Home() {
  const { currentGame, startNewGame } = useNavalBattle();

  if (currentGame) {
    return (
      <Container>
        <HomeTitle>Naval Battle</HomeTitle>
        <Game />
      </Container>
    );
  }
  return (
    <Container>
      <HomeTitle>Naval Battle</HomeTitle>
      <HomeInfo>Hi! I'm happy to see you ❤️</HomeInfo>
      <HomeInfo>If you are ready to start, click on the button 😄</HomeInfo>
      <Button onClick={startNewGame}>Start new game</Button>
    </Container>
  );
}

export default Home;
