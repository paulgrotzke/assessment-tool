import React, { useState } from 'react';
import AuthCheck from '../../Components/AuthCheck';
import Raiting from './Components/Rating';
import * as t from './types';
import Question from './Components/Question';
import useLocalDocRef from './Hooks/useLocalDocRef';
import Buttons from './Components/Buttons';
import { firestore } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import GeneralQuestions from './Components/GeneralQuestions';
import Results from './Components/Results';
import Feedback from './Components/Feedback';

const Survey = () => {
  const localDocRef = useLocalDocRef();

  //
  // GENERALQUESTIONS - questions before survey
  //
  const [
    showGeneralQuestions,
    setShowGeneralQuestions,
  ] = useState<boolean>(true);
  const [
    generalQuestions,
    setGeneralQuestions,
  ] = useState<t.GeneralQuestionsAnswer>({
    industryBelong: '',
    amountEmployees: '',
    companyPosition: '',
  });

  const postgeneralQuestion = async () => {
    const newAnswerRef = firestore
      .collection('surveys')
      .doc(localDocRef);
    await newAnswerRef.set(generalQuestions, { merge: true });
  };

  //
  // QUESTIONS - survey questions
  //
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

  //
  //
  //
  // TODO REFACTOR
  const answerRef = firestore.collection('surveys');
  const [answers] = useCollection(answerRef);
  let answer = 0;
  answers?.docs.forEach((doc): void => {
    if (doc.id === localDocRef) {
      answer = doc.data()[questions[counter.value].id]?.value;
    }
  });

  // post survey answer
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

  //
  // Feedback
  //
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<t.FeedbackAnswer>({
    comprehensiveness: 0,
    consistency: 0,
    problemAdequacy: 0,
  });
  const postFeedback = async () => {
    const newAnswerRef = firestore
      .collection('surveys')
      .doc(localDocRef);
    await newAnswerRef.set(feedback, { merge: true });
  };

  //
  // RESULTS
  //
  const [showResults, setShowResults] = useState<boolean>(false);
  // const resultsRef = firestore
  //   .collection('surveys')
  //   .doc(localDocRef)
  //   .collection('answers');
  // const [resultsData] = useCollection(resultsRef);
  // const results = [];
  // resultsData?.docs.map((doc: t.Document) =>
  //   results.push({
  //     id: doc.id,
  //     value: doc.data().value,
  //     focusArea: doc.data().focusArea,
  //     digitalCapability: doc.data().digitalCapability,
  //     practiceItem: doc.data().practiceItem,
  //   }),
  // );
  // console.log(results);

  if (showGeneralQuestions)
    return (
      <AuthCheck role="user">
        <GeneralQuestions
          generalQuestions={generalQuestions}
          setGeneralQuestions={setGeneralQuestions}
          setShowGeneralQuestions={setShowGeneralQuestions}
          postgeneralQuestion={postgeneralQuestion}
        />
      </AuthCheck>
    );

  if (showFeedback)
    return (
      <AuthCheck role="user">
        <Feedback
          setShowResults={setShowResults}
          postFeedback={postFeedback}
          feedback={feedback}
          setFeedback={setFeedback}
          setShowFeedback={setShowFeedback}
        />
      </AuthCheck>
    );

  if (showResults)
    return (
      <AuthCheck role="user">
        <Results />
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
                setRaiting={setRaiting}
                question={question}
                answer={answer}
              />
              <Buttons
                postAnswer={postAnswer}
                counter={counter.value}
                setCounter={setCounter}
                amountQuestions={amountQuestions}
                raiting={raiting.value}
                answer={answer}
                setShowFeedback={setShowFeedback}
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
