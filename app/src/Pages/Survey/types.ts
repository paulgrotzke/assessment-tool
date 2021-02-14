export type Question = {
  id: string;
  focusArea: string;
  digitalCapability: string;
  practiceItem: string;
};

export type Document = {
  id: string;
  data: () => Question;
};

export type Raiting = {
  questionId: string;
  value: number | boolean;
};

export type Counter = {
  value: number;
};

export interface Answer {
  [questionId: string]: AnswerValue;
}

export interface AnswerValue {
  value: number | boolean;
}
