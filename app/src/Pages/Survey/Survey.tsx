import React, { useState } from 'react';
import AuthCheck from '../../Components/AuthCheck';
import Raiting from './Components/Rating';
import * as t from './types';
import Question from './Components/Question';
import useLocalDocRef from './Hooks/useLocalDocRef';
import Buttons from './Components/Buttons';
import { firestore } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const Survey = () => {
  //TODO: seems to be not working with private mode in chrome - recheck
  const localDocRef = useLocalDocRef();
  const [counter, setCounter] = useState<t.Counter>({ value: 0 });
  const [raiting, setRaiting] = useState<t.Raiting>({
    questionId: '',
    value: false,
    digitalCapability: '',
    focusArea: '',
    practiceItem: '',
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

  const answerRef = firestore.collection('answers');
  const [answers] = useCollection(answerRef);
  let answer = 0;
  answers?.docs.forEach((doc): void => {
    if (doc.id === localDocRef) {
      answer = doc.data()[questions[counter.value].id]?.value;
    }
  });

  const postAnswer = async () => {
    const answer: t.Answer = {
      [raiting.questionId]: {
        value: raiting.value,
        focusArea: raiting.focusArea,
        digitalCapability: raiting.digitalCapability,
        practiceItem: raiting.practiceItem,
      },
    };

    const newAnswerRef = firestore
      .collection('answers')
      .doc(localDocRef);
    await newAnswerRef.set(answer, { merge: true });
    await newAnswerRef.set(counter, { merge: true });
  };

  return (
    <AuthCheck role="user">
      {questions.map((question, i) => {
        if (counter.value === i) {
          return (
            <div key={i}>
              <Question question={question} />
              <Raiting
                min={'Not implemented'}
                max={'Fully implemented'}
                setRaiting={setRaiting}
                question={question}
                text={true}
                answer={answer}
              />
              <Buttons
                postAnswer={postAnswer}
                counter={counter.value}
                setCounter={setCounter}
                amountQuestions={amountQuestions}
                raiting={raiting.value}
                answer={answer}
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
