import React, { useState } from 'react';
import AuthCheck from '../../Components/AuthCheck';
import Raiting from './Components/Rating';
import { firestore } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import * as t from './types';
import Question from './Components/Question';
import useLocalDocRef from './Hooks/useLocalDocRef';
import Buttons from './Components/Buttons';

const Survey = () => {
  const localDofRef = useLocalDocRef();

  const [raiting, setRaiting] = useState<t.Raiting>({
    questionId: '',
    value: null,
  });

  const ref = firestore.collection('questions');
  const [data] = useCollection(ref);
  const questions: t.Question[] = [];
  data?.docs.map((doc: t.Document) =>
    questions.push({
      id: doc.id,
      focusArea: doc.data().focusArea,
      digitalCapability: doc.data().digitalCapability,
      practiceItem: doc.data().practiceItem,
    }),
  );
  const amountQuestions = questions.length;

  const [counter, setCounter] = useState<t.Counter>({ value: 0 });

  const postAnswers = async () => {
    const newAnswerRef = firestore
      .collection('answers')
      .doc(localDofRef);

    const data = {
      [raiting.questionId]: {
        value: raiting.value,
      },
    };
    await newAnswerRef.set(data, { merge: true });
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
              />
              <Buttons
                postAnswers={postAnswers}
                counter={counter}
                setCounter={setCounter}
                amountQuestions={amountQuestions}
              />
            </div>
          );
        }
        return <div></div>;
      })}
    </AuthCheck>
  );
};

export default Survey;
