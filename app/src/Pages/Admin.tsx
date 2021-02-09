import React from 'react';
import { Route } from 'react-router-dom';
import Statistics from '../Pages/Statistics';
import Controllcenter from '../Pages/Controllcenter';
import AuthCheck from '../Components/AuthCheck';

const Admin = () => {
  return (
    <AuthCheck role={'admin'}>
      <Route exact path="/controllcenter">
        <Controllcenter />
      </Route>
      <Route exact path="/statistics">
        <Statistics />
      </Route>
    </AuthCheck>
  );
};

export default Admin;
