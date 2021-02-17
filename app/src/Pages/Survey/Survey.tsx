import React, { useState } from 'react';
import AuthCheck from '../../Components/AuthCheck';
import Raiting from './Components/Rating';
import * as t from './types';
import Question from './Components/Question';
import useLocalDocRef from './Hooks/useLocalDocRef';
import Buttons from './Components/Buttons';
import { firestore } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import Company from './Components/GeneralQuestions';

const Survey = () => {
  const localDocRef = useLocalDocRef();
  const [counter, setCounter] = useState<t.Counter>({ value: 0 });
  const [raiting, setRaiting] = useState<t.Raiting>({
    questionId: '',
    value: false,
    digitalCapability: '',
    focusArea: '',
    practiceItem: '',
  });
  let [
    generalQuestions,
    setGeneralQuestions,
  ] = useState<t.GeneralQuestionsAnswer>({
    industryBelong: '',
    amountEmployees: '',
    companyPosition: '',
  });

  const [
    showGeneralQuestions,
    setShowGeneralQuestions,
  ] = useState<boolean>(true);

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

  console.log(generalQuestions);

  const answerRef = firestore.collection('surveys');
  const [answers] = useCollection(answerRef);
  let answer = 0;
  answers?.docs.forEach((doc): void => {
    if (doc.id === localDocRef) {
      answer = doc.data()[questions[counter.value].id]?.value;
    }
  });

  const postAnswer = async () => {
    const answer: t.Answer = {
      value: raiting.value,
      focusArea: raiting.focusArea,
      digitalCapability: raiting.digitalCapability,
      practiceItem: raiting.practiceItem,
    };

    const newAnswerRef = firestore
      .collection('surveys')
      .doc(localDocRef)
      .collection('answers')
      .doc(raiting.questionId);
    await newAnswerRef.set(answer, { merge: true });
    await newAnswerRef.set(counter, { merge: true });
  };

  const postgeneralQuestion = async () => {
    const newAnswerRef = firestore
      .collection('surveys')
      .doc(localDocRef);
    await newAnswerRef.set(generalQuestions, { merge: true });
  };

  if (showGeneralQuestions)
    return (
      <AuthCheck role="user">
        <Company
          generalQuestions={generalQuestions}
          setGeneralQuestions={setGeneralQuestions}
          setShowGeneralQuestions={setShowGeneralQuestions}
          postgeneralQuestion={postgeneralQuestion}
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
