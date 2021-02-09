import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Admin from './Pages/Admin';
import User from './Pages/User';

function App() {
  return (
    <div>
      <Route exact path="/">
        <User />
      </Route>
      <Route exact path="/admin">
        <Admin />
      </Route>
    </div>
  );
}

export default App;
