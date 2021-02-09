import React from 'react';
import { Link } from 'react-router-dom';
import AuthCheck from '../Components/AuthCheck';

const Disclaimer = () => {
  return (
    <AuthCheck role="user">
      <h1>Brief explanation of the assessment tool:</h1>
      <p>
        You will be guided through assessmenmt questions step by step
      </p>
      <p>
        Your data will be stored anonymously, secure and will only be
        used for scientiffic purposes
      </p>
      <p>Assessment will take about 20-30min</p>
      <p></p>At the end of the assessment, you will be asked for your
      email address so that we can send you a comprehensive evaluation
      in PDF format
      <Link to="/survey">Start assessment</Link>
    </AuthCheck>
  );
};

export default Disclaimer;
