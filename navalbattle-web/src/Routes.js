import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Loader from './Loader';

const Game = React.lazy(() => import(/* webpackChunkName: "Game" */ './game/Game'));

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ './Home'));

function Routes() {
  return (
    <React.Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/game" component={Game} />
        <Route path="/loading" component={Loader} />
        <Route path="/" component={Home} />
      </Switch>
    </React.Suspense>
  );
}

export default Routes;
