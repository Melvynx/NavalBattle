import { Route, Switch } from 'react-router-dom';
import React from 'react';

const Game = React.lazy(() => import(/* webpackChunkName: "Game" */ './board/Game'));

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ './Home'));

function Routes() {
  return (
    <React.Suspense fallback={<p>loading</p>}>
      <Switch>
        <Route path="/game" component={Game} />
        <Route path="/" component={Home} />
      </Switch>
    </React.Suspense>
  );
}

export default Routes;
