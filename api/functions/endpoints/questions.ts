import { db } from '../utils/admin';

type Question = {
  questionId: string;
  focusArea: string;
  digitalCapability: string;
  practiceItem: string;
};

type GetAllQuestionsResponse = Question[] | void;

export const getAllQuestions = (
  req,
  res,
): GetAllQuestionsResponse => {
  db.collection('questions')
    .get()
    .then((data) => {
      let questions: Question[] = [];
      data.forEach((doc) => {
        questions.push({
          questionId: doc.id,
          focusArea: doc.data().focusArea,
          digitalCapability: doc.data().digitalCapability,
          practiceItem: doc.data().practiceItem,
        });
      });
      return res.json(questions);
    })
    .catch((e) => {
      return res.status(500).json({ error: e.code });
    });
};