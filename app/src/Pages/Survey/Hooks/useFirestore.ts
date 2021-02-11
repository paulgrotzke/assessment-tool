import { firestore } from '../../../lib/firebase';
import * as t from '../types';

const useFirestore = () => {
  const getQuestions = async (): Promise<t.Question[]> => {
    const ref = await firestore.collection('questions').get();
    const questions: t.Question[] = [];
    ref.docs.map((doc) => {
      questions.push({
        id: doc.id,
        focusArea: doc.data().focusArea,
        digitalCapability: doc.data().digitalCapability,
        practiceItem: doc.data().practiceItem,
      });
    });
    return questions;
  };

  const postAnswer = async (
    localDocRef: string,
    answer: {},
  ): Promise<void> => {
    const newAnswerRef = firestore
      .collection('answers')
      .doc(localDocRef);
    await newAnswerRef.set(answer, { merge: true });
  };

  return {
    questions: getQuestions(),
    postAnswer: postAnswer,
  };
};

export default useFirestore;
