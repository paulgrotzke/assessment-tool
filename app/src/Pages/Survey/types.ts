export type Question = {
  id: string
  focusArea: string
  digitalCapability: string
  practiceItem: string
  listing: number
  maturityStage: string
}

export type QuestionDocument = {
  id: string
  data: () => Question
}

export type Raiting = {
  questionId: string
  value: number | boolean
  digitalCapability: string
  focusArea: string
  practiceItem: string
}

export type Counter = {
  value: number
}

export type Answer = {
  answerValue: number | boolean
  digitalCapability: string
  focusArea: string
  practiceItem: string
  maturityStage: string
}

export type GeneralQuestionsAnswer = {
  industryBelong?: string
  amountEmployees?: string
  companyPosition?: string
}

export type FeedbackAnswer = {
  comprehensiveness: number | null
  consistency: number | null
  problemAdequacy: number | null
}

export type AnswerDocument = {
  id: string
  data: () => Answer
}
