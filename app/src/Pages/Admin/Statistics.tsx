import React from 'react';
import AuthCheck from '../../Components/AuthCheck';
const Statistics = () => {
  return (
    <AuthCheck role="admin">
      <h1>Statistics</h1>
    </AuthCheck>
  );
};

export default Statistics;
