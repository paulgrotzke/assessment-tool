import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Disclaimer from './Pages/Survey/Disclaimer';
import Survey from './Pages/Survey/Survey';
import Statistics from './Pages/Admin/Statistics';
import Controllcenter from './Pages/Admin/Controllcenter';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/disclaimer">
          <Disclaimer />
        </Route>
        <Route exact path="/survey">
          <Survey />
        </Route>
        <Route exact path="/admin/controllcenter">
          <Controllcenter />
        </Route>
        <Route exact path="/admin/statistics">
          <Statistics />
        </Route>
        <Redirect from="/" to="/survey" />
        <Route>
          <Survey />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
