import React from 'react';
import AuthCheck from '../Components/AuthCheck';
import Raiting from '../Components/Rating';

const Feedback = () => {
  return (
    <AuthCheck role="user">
      <p>Great!</p>
      <p>You have successfully passed all assessment questions!</p>
      <p>
        In order to improve our tool continously, I would like to ask
        you for some feedback.
      </p>
      <p>
        Pleaserate the assessment tool including all dimensions,
        digital capabilities and practice items with regard to the
        three criteria:
      </p>
      <p>Comprehensiveness, consistency and problem adequacy</p>
      <Raiting
        min={'not comprehensiveness'}
        max={'fully comprehensiveness'}
      />
      <Raiting min={'no consistenmcy'} max={'full consistency'} />
      <Raiting
        min={'no problem adequacy'}
        max={'full problem adequacy'}
      />
    </AuthCheck>
  );
};

export default Feedback;
