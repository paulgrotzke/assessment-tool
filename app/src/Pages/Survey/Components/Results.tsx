import React from 'react';
import AuthCheck from '../../../Components/AuthCheck';

type Props = {};

const Results = (props: Props) => {
  return (
    <AuthCheck role="user">
      <h1>Great!</h1>
      <p>You have successfully passed the assessment!</p>
      <p>
        If you want to have the corresponding, please provide your
        email.
      </p>
      <p>
        After clicking on submit, the evaluation will be sent to you
        in PDF format.
      </p>
    </AuthCheck>
  );
};

export default Results;
