import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import Survey from './Pages/Survey';
import Disclaimer from './Pages/Disclaimer';
import Feedback from './Pages/Feedback';
import Results from './Pages/Results';
import Statistics from './Pages/Statistics';
import Controllcenter from './Pages/Controllcenter';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/disclaimer">
          <Disclaimer />
        </Route>
        <Route path="/survey">
          <Survey />
        </Route>
        <Route path="/feedback">
          <Feedback />
        </Route>
        <Route path="/results">
          <Results />
        </Route>
        <Route path="/controllcenter">
          <Controllcenter />
        </Route>
        <Route path="/statistics">
          <Statistics />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
