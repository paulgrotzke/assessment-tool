import { firestore } from '../../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import * as t from '../types';

const useSurveys = () => {
  const generealQuestionsRef = firestore.collection('surveys');
  const [data] = useCollection(generealQuestionsRef);

  const surveyData: t.GeneralQuestions[] = [];
  data?.docs.forEach((doc: t.GeneralQuestionsDocument) => surveyData.push(doc.data()));

  const docs: string[] = [];
  data?.docs.map((doc: any) => docs.push(doc.id));

  return {
    surveyData: surveyData,
    docs: docs,
  };
};

export default useSurveys;
