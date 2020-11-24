import React from 'react';
import {
  // PrivateRoute,
  PublicRoute
} from './common';
import Login from './views/Login';
import Registration from './views/Registration'
import { Switch } from 'react-router-dom';
// import * as routes from './constants/routes';
import './css/styles.css';

function App() {
  return (
    <div>
      <Switch>
        <PublicRoute
          path={'/login'}
          restricted
          exact
          redirectTo={'/'}
          component={Login}
        />
        <PublicRoute
          path={'/register'}
          restricted
          exact
          redirectTo={'/'}
          component={Registration}
        />
      </Switch>
    </div>
  );
}

export default App;
