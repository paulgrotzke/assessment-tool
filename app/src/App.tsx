import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Disclaimer from './Pages/Disclaimer';
import Feedback from './Pages/Feedback';
import Results from './Pages/Results';
import Survey from './Pages/Survey';
import Statistics from './Pages/Statistics';
import Controllcenter from './Pages/Controllcenter';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/disclaimer">
        <Disclaimer />
      </Route>
      <Route exact path="/survey">
        <Survey />
      </Route>
      <Route exact path="/feedback">
        <Feedback />
      </Route>
      <Route exact path="/results">
        <Results />
      </Route>
      <Route exact path="/admin/controllcenter">
        <Controllcenter />
      </Route>
      <Route exact path="/admin/statistics">
        <Statistics />
      </Route>
    </BrowserRouter>
  );
}

export default App;
