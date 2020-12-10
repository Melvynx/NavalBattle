import styled from 'styled-components';
import Game from './board/Game';
import { useNavalBattle } from './hooks/NavalBattleProvider';
import { ButtonOutlined } from './styled-components/Button';

const Container = styled.div`
  justify-content: center;
  margin: 16px;
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
  color: white;
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
      <HomeInfo>
        You have not any current game in progress. Click to start a new game !
      </HomeInfo>
      <ButtonOutlined onClick={startNewGame}>Start new game</ButtonOutlined>
    </Container>
  );
}

export default Home;
