import * as functions from 'firebase-functions';
import * as express from 'express';
import { getAllQuestions, postOneQuestion } from '../endpoints/questions'

const app = express();

app.get('/questions', getAllQuestions);
app.post('/question', postOneQuestion)

export const api = functions.region('europe-west1').https.onRequest(app);
