import React, { useState } from 'react';
import AuthCheck from '../../Components/AuthCheck';
import Raiting from './Components/Rating';
import * as t from './types';
import Question from './Components/Question';
import useLocalDocRef from './Hooks/useLocalDocRef';
import Buttons from './Components/Buttons';
import useFirestore from './Hooks/useFirestore';

const Survey = () => {
  //TODO: seems to be not working with private mode in chrome - recheck
  const localDocRef = useLocalDocRef();
  const data = useFirestore();

  const [questions, setQuestions] = useState<t.Question[]>([]);
  const [amountQuestions, setAmountQuestions] = useState<number>(0);
  const [counter, setCounter] = useState<t.Counter>({ value: 0 });
  const [raiting, setRaiting] = useState<t.Raiting>({
    questionId: '',
    value: false,
  });

  data.questions.then((res) => {
    setQuestions(res);
    setAmountQuestions(res.length);
  });

  const answer = {
    [raiting.questionId]: {
      value: raiting.value,
    },
  };

  const postAnswer = () => {
    data.postAnswer(localDocRef, answer);
  };

  return (
    <AuthCheck role="user">
      {questions.map((question, i) => {
        if (counter.value === i) {
          return (
            <div
              key={i}
              className="items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
              <Question question={question} />
              <Raiting
                min={'Not implemented'}
                max={'Fully implemented'}
                setRaiting={setRaiting}
                questionId={question.id}
                text={true}
              />
              <Buttons
                postAnswer={postAnswer}
                counter={counter.value}
                setCounter={setCounter}
                amountQuestions={amountQuestions}
                raiting={raiting.value}
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
