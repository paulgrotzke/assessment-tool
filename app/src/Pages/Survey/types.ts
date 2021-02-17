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
  digitalCapability: string;
  focusArea: string;
  practiceItem: string;
};

export type Counter = {
  value: number;
};

export interface Answer {
  [questionId: string]: AnswerValue;
}

type AnswerValue = {
  value: number | boolean;
  digitalCapability: string;
  focusArea: string;
  practiceItem: string;
};

export type GeneralQuestionsAnswer = {
  industryBelong?: string;
  amountEmployees?: string;
  companyPosition?: string;
};
