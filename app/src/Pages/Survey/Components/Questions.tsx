import React from 'react';
import AuthCheck from '../../../Components/AuthCheck';
import useQuestions from '../Hooks/useQuesations';
import * as t from '../types';
import Buttons from './Buttons';
import Question from './Question';
import Raiting from './Rating';
import { useCollection } from 'react-firebase-hooks/firestore';
import useLocalDocRef from '../Hooks/useLocalDocRef';
import { firestore } from '../../../lib/firebase';

type Props = {
  setRaiting: (raiting: t.Raiting) => void;
  postAnswer: () => void;
  counter: number;
  setCounter: ({ value: number }) => void;
  raiting: number | boolean;
  setShowFeedback: (bool: boolean) => void;
};

const Questions = (props: Props) => {
  const questions = useQuestions();
  const localDocRef = useLocalDocRef();

  const answerRef = firestore.collection('surveys');
  const [answers] = useCollection(answerRef);
  let answer = 0;
  answers?.docs.forEach((doc): void => {
    if (doc.id === localDocRef) {
      answer = doc.data()[questions[props.counter].id]?.value;
    }
  });

  return (
    <AuthCheck role="user">
      {questions.map((question, i) => {
        if (props.counter === i) {
          return (
            <div key={i}>
              <Question question={question} />
              <Raiting
                setRaiting={props.setRaiting}
                question={question}
                answer={answer}
              />
              <Buttons
                postAnswer={props.postAnswer}
                counter={props.counter}
                setCounter={props.setCounter}
                raiting={props.raiting}
                answer={answer}
                setShowFeedback={props.setShowFeedback}
              />
            </div>
          );
        }
        return <div key={i}></div>;
      })}
    </AuthCheck>
  );
};

export default Questions;
