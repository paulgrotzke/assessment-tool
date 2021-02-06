"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllQuestions = void 0;
const admin_1 = require("../utils/admin");
exports.getAllQuestions = () => {
    admin_1.db.collection('questions')
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
        return questions;
    });
    return null;
};
//# sourceMappingURL=questions.js.map