export type Question = {
  id: string;
  focusArea: string;
  digitalCapability: string;
  practiceItem: string;
};

export type QuestionDocument = {
  id: string;
  data: () => Question;
};

// export type AnswerDocument = {
//   id: string;
//   data: () => Survey;
// };

// export interface Survey {
//   [questionId: string]: AnswerValue;
// }

// export type Survey = {
//   surveyId: string;
// };

export interface AnswerValue {
  value: number | boolean;
}

export type Document = {
  id: string;
  data: () => Survey;
};

export type Survey = {
  questionId: string;
  value: number | boolean;
  digitalCapability: string;
  focusArea: string;
  practiceItem: string;
};
