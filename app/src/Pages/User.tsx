import React from 'react';
import { Route } from 'react-router-dom';
import Disclaimer from '../Pages/Disclaimer';
import Feedback from '../Pages/Feedback';
import Results from '../Pages/Results';
import Survey from '../Pages/Survey';
import AuthCheck from '../Components/AuthCheck';

const User = () => {
  return (
    <AuthCheck role={'user'}>
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
    </AuthCheck>
  );
};

export default User;
