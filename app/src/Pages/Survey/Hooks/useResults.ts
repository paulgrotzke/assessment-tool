import { firestore } from '../../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import useLocalDocRef from './useLocalDocRef';
import * as t from '../types';

const useResults = () => {
  const localDocRef = useLocalDocRef();

  const resultsRef = firestore
    .collection('surveys')
    .doc(localDocRef)
    .collection('answers');
  const [resultsData] = useCollection(resultsRef);
  const results: t.Answer[] = [];
  resultsData?.docs.map((doc: t.AnswerDocument) =>
    results.push({
      value: doc.data().value,
      digitalCapability: doc.data().digitalCapability,
      focusArea: doc.data().focusArea,
      practiceItem: doc.data().practiceItem,
    }),
  );
  return results;
};

export default useResults;
