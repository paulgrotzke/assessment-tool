import React from 'react';
import AuthCheck from '../../Components/AuthCheck';
import ConfigureQuestions from './Components/CreateQuestion';

const Controllcenter = () => {
  return (
    <AuthCheck role="admin">
      <ConfigureQuestions />
    </AuthCheck>
  );
};

export default Controllcenter;
