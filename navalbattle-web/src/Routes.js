import { Route, Switch } from 'react-router-dom';
import Game from './board/Game';
import Home from './Home';

function Routes() {
  return (
    <Switch>
      <Route path="/game" component={Game} />
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default Routes;
