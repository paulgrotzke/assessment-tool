import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Disclaimer from './Pages/Survey/Disclaimer';
import Feedback from './Pages/Survey/Feedback';
import Results from './Pages/Admin/Results';
import Survey from './Pages/Survey/Survey';
import Statistics from './Pages/Admin/Statistics';
import Controllcenter from './Pages/Admin/Controllcenter';
import Company from './Pages/Survey/Company';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/disclaimer">
        <Disclaimer />
      </Route>
      <Route exact path="/survey">
        <Survey />
      </Route>
      <Route exact path="/company">
        <Company />
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
