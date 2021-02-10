import React, { useState } from 'react';
import AuthCheck from '../../Components/AuthCheck';
import Raiting from './Components/Rating';
import { firestore } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import * as t from './types';
import Question from './Components/Question';
import useLocalDocRef from './Hooks/useLocalDocRef';

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
      {questions.map((question, i) => (
        <div key={i}>
          <Question question={question} />
          <Raiting
            min={'not implemented'}
            max={'fully implemented'}
            setRaiting={setRaiting}
            questionId={question.id}
          />
          <button onClick={() => postAnswers()}>Next Question</button>
        </div>
      ))}
    </AuthCheck>
  );
};

export default Survey;
