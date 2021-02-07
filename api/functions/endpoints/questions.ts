import { response } from 'express';
import { db } from '../firebaseAdmin';

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

export const postOneQuestion = (req, res) => {
  if (req.body.focusArea.trim() === '') {
    return res.status(400).json({ body: 'Can not be empty' });
  }
  if (req.body.digitalCapability.trim() === '') {
    return res.status(400).json({ body: 'Can not be empty' });
  }
  if (req.body.practiceItem.trim() === '') {
    return res.status(400).json({ body: 'Can not be empty' });
  }
  const newQuestion = {
    focusArea: req.body.focusArea,
    digitalCapability: req.body.digitalCapability,
    practiceItem: req.body.practiceItem,
  };
  db.collection('questions')
    .add(newQuestion)
    .then((doc) => {
      const responseQuestion = newQuestion;
      responseQuestion['questionId'] = doc.id;
      return res.json(responseQuestion);
    })
    .catch((e) => {
      return res.status(500).json({ error: e.code });
    });
};

export const deleteOneQuestion = (req, res) => {
  const document = db.doc(`/questions/${req.params.questionId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Question not found' });
      }
      return document.delete();
    })
    .then(() => {
      res.json({ message: 'Question deleted' });
    })
    .catch((e) => {
      console.log(e);
      return response.status(500).json({ error: e.code });
    });
};

export const editQuestion = (req, res) => {
  if (req.body.questionId) {
    res.status(403).json({ message: 'Can not edit QuestionId' });
  }
  let document = db
    .collection('questions')
    .doc(`${req.params.questionId}`);
  document
    .update(req.body)
    .then(() => {
      res.json({ message: 'Update success' });
    })
    .catch((e) => {
      console.log(e);
      return res.json(500).json({
        error: e.code,
      });
    });
};
