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

export type AnswerDocument = {
  id: string;
  data: () => Survey;
};

export interface Survey {
  [questionId: string]: AnswerValue;
}

export interface AnswerValue {
  value: number | boolean;
}
