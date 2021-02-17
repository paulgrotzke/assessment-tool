import { firestore } from '../../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import useLocalDocRef from './useLocalDocRef';
import * as t from '../types';

const useQuestions = () => {
  const localDocRef = useLocalDocRef();

  const ref = firestore.collection('questions');
  const [data] = useCollection(ref);
  const questions: t.Question[] = [];
  data?.docs.map((doc: t.QuestionDocument) =>
    questions.push({
      id: doc.id,
      focusArea: doc.data().focusArea,
      digitalCapability: doc.data().digitalCapability,
      practiceItem: doc.data().practiceItem,
    }),
  );
  return questions;
};

export default useQuestions;
