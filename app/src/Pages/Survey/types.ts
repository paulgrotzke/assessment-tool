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
  value: number | null;
};

export type Counter = {
  value: number;
};
