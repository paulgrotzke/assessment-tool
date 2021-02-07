"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const functions = require("firebase-functions");
const express = require("express");
const questions_1 = require("../endpoints/questions");
const app = express();
app.get('/questions', questions_1.getAllQuestions);
app.post('/question', questions_1.postOneQuestion);
app.delete('/question/:questionId', questions_1.deleteOneQuestion);
app.put('/question/:questionId', questions_1.editQuestion);
exports.api = functions
    .region('europe-west1')
    .https.onRequest(app);
//# sourceMappingURL=index.js.map