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

  if (showResults)
    return (
      <AuthCheck role="user">
        <Results />
      </AuthCheck>
    );

  if (showGeneralQuestions)
    return (
      <AuthCheck role="user">
        <GeneralQuestions
          generalQuestions={generalQuestions}
          setGeneralQuestions={setGeneralQuestions}
          setShowGeneralQuestions={setShowGeneralQuestions}
          localDocRef={localDocRef}
          firestore={firestore}
        />
      </AuthCheck>
    );

  if (showFeedback)
    return (
      <AuthCheck role="user">
        <Feedback
          setShowResults={setShowResults}
          setShowFeedback={setShowFeedback}
          localDocRef={localDocRef}
          firestore={firestore}
        />
      </AuthCheck>
    );

  return (
    <AuthCheck role="user">
      {questions.map((question, i) => {
        if (counter.value === i) {
          return (
            <div key={i}>
              <Question question={question} />
              <Raiting setRaiting={setRaiting} question={question} />
              <Buttons
                counter={counter}
                setCounter={setCounter}
                raiting={raiting}
                setShowFeedback={setShowFeedback}
                localDocRef={localDocRef}
                firestore={firestore}
              />
            </div>
          );
        }
        return <div key={i}></div>;
      })}
    </AuthCheck>
  );
};

export default Survey;
