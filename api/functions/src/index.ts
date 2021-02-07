import * as functions from 'firebase-functions';
import * as express from 'express';
import {
  getAllQuestions,
  postOneQuestion,
  deleteOneQuestion,
  editQuestion,
} from '../endpoints/questions';

const app = express();

app.get('/questions', getAllQuestions);
app.post('/question', postOneQuestion);
app.delete('/question/:questionId', deleteOneQuestion);
app.put('/question/:questionId', editQuestion)

export const api = functions
  .region('europe-west1')
  .https.onRequest(app);