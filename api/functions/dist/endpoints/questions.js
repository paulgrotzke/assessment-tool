"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postOneQuestion = exports.getAllQuestions = void 0;
const firebaseAdmin_1 = require("../firebaseAdmin");
exports.getAllQuestions = (req, res) => {
    firebaseAdmin_1.db.collection('questions')
        .get()
        .then((data) => {
        let questions = [];
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
exports.postOneQuestion = (req, res) => {
    console.log(req.body.focusArea);
    console.log(req.body);
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
    firebaseAdmin_1.db.collection('questions')
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
//# sourceMappingURL=questions.js.map