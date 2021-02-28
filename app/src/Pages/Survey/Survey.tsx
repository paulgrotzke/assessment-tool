import React, { useState } from 'react';
import { firestore } from '../../lib/firebase';
import * as t from './types';
import useLocalDocRef from './Hooks/useLocalDocRef';
import useQuestions from '../Hooks/useQuestions';
import AuthCheck from '../../Components/AuthCheck';
import Buttons from './Components/Buttons';
import Feedback from './Components/Feedback';
import GeneralQuestions from './Components/GeneralQuestions';
import Raiting from './Components/Rating';
import Results from './Components/Results';
import Question from './Components/Question';
import tw, { styled } from 'twin.macro';

const Survey = () => {
  const localDocRef = useLocalDocRef();
  const questions = useQuestions();

  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [generalQuestions, setGeneralQuestions] = useState<t.GeneralQuestionsAnswer>({
    industryBelong: '',
    amountEmployees: '',
    companyPosition: '',
  });
  const [showGeneralQuestions, setShowGeneralQuestions] = useState<boolean>(true);
  const [counter, setCounter] = useState<t.Counter>({ value: 0 });
  const [raiting, setRaiting] = useState<t.Raiting>({
    questionId: '',
    value: 0,
    digitalCapability: '',
    focusArea: '',
    practiceItem: '',
  });

  console.log(raiting)

  if (showResults)
    return (
      <AuthCheck role="user">
        <Results />
      </AuthCheck>
    );

  if (showGeneralQuestions)
    return (
      <AuthCheck role="user">
        <Wrapper>
          <GeneralQuestions
            generalQuestions={generalQuestions}
            setGeneralQuestions={setGeneralQuestions}
            setShowGeneralQuestions={setShowGeneralQuestions}
            localDocRef={localDocRef}
            firestore={firestore}
          />
        </Wrapper>
      </AuthCheck>
    );

  if (showFeedback)
    return (
      <AuthCheck role="user">
        <Wrapper>
          <Feedback
            setShowResults={setShowResults}
            setShowFeedback={setShowFeedback}
            localDocRef={localDocRef}
            firestore={firestore}
          />
        </Wrapper>
      </AuthCheck>
    );

  return (
    <AuthCheck role="user">
      <Wrapper>
        {questions.map((question, i) => {
          if (counter.value === i) {
            return (
              <div key={i}>
                <Question question={question} counter={counter} questionLength={questions.length} />
                <Raiting setRaiting={setRaiting} question={question} />
                <Buttons
                  counter={counter}
                  setCounter={setCounter}
                  raiting={raiting}
                  setRaiting={setRaiting}
                  setShowGeneralQuestions={setShowGeneralQuestions}
                  setShowFeedback={setShowFeedback}
                  localDocRef={localDocRef}
                  firestore={firestore}
                />
              </div>
            );
          }
          return <div key={i}></div>;
        })}
      </Wrapper>
    </AuthCheck>
  );
};

export default Survey;

const Wrapper = styled.div`
  ${tw`
    max-w-xl bg-white px-10 py-6 rounded-md shadow-2xl
  `}

  > h2 {
    ${tw`
      mb-6
      pt-8
      font-extrabold text-2xl uppercase
    `}
  }

  > h3 {
    ${tw`
      mt-4
      mb-1
      font-semibold text-lg
    `}
  }
`;

const Select = styled.select`
  ${tw`
    p-2 w-full m-0
    rounded-md shadow-sm border border-gray-300
    focus:outline-none focus:ring focus:ring-indigo-400
  `}
`;

const Input = styled.input`
  ${tw`
    p-2 w-full m-0
    rounded-md shadow-sm border border-gray-300
    focus:outline-none focus:ring focus:ring-indigo-400
    placeholder-black text-black
  `}
`;

const Button = styled.button`
  ${tw`
    bg-indigo-600 rounded-md py-2 px-6 mt-4
    text-white
    focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-500
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
`;
