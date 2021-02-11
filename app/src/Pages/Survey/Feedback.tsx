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
      <div className="w-full max-w-xl space-y-2 items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
        <h2 className="mt-6 text-3xl font-extrabold  text-gray-900">
          Great!
        </h2>
        <h4 className="mt-6 text-xl font-semibold text-gray-900">
          You have successfully passed all assessment questions!
        </h4>
        <p className="my-6 text-xl text-gray-900">
          In order to improve our tool continously, I would like to
          ask you for some feedback. Please rate the assessment tool
          including all dimensions, digital capabilities and practice
          items with regard to the three criteria:
        </p>
        <p className="text-xl text-gray-900">
          Comprehensiveness, consistency and problem adequacy
        </p>
        <Raiting
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
        />
      </div>
    </AuthCheck>
  );
};

export default Feedback;
