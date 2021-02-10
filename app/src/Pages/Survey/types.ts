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

export type RaitingValue = {
  questionId: string;
  raiting: number | null;
};