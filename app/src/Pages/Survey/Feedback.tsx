import React, { useState } from 'react';
import AuthCheck from '../../Components/AuthCheck';
import Raiting from './Components/Rating';
import * as t from './types';

const Feedback = () => {
  const [raiting, setRaiting] = useState<t.Raiting>({
    questionId: '',
    value: false,
  });

  return (
    <AuthCheck role="user">
      <div>
        <h2>Great!</h2>
        <h4>
          You have successfully passed all assessment questions!
        </h4>
        <p>
          In order to improve our tool continously, I would like to
          ask you for some feedback. Please rate the assessment tool
          including all dimensions, digital capabilities and practice
          items with regard to the three criteria:
        </p>
        <p>Comprehensiveness, consistency and problem adequacy</p>
        {/* <Raiting
          min={'No comprehensiveness'}
          max={'Full comprehensiveness'}
          setRaiting={setRaiting}
          text={false}
        />
        <Raiting
          min={'No consistency'}
          max={'Full consistency'}
          setRaiting={setRaiting}
          text={false}
        />
        <Raiting
          min={'No problem adequacy'}
          max={'Full problem adequacy'}
          setRaiting={setRaiting}
          text={false}
        /> */}
      </div>
    </AuthCheck>
  );
};

export default Feedback;
