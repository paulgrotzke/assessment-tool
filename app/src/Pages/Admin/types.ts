export type Question = {
  id: string
  focusArea: string
  digitalCapability: string
  practiceItem: string
}

export type QuestionDocument = {
  id: string
  data: () => Question
}

export interface AnswerValue {
  value: number | boolean
}

export type Document = {
  id: string
  data: () => Survey
}

export type Survey = {
  questionId: string
  value: number | boolean
  digitalCapability: string
  focusArea: string
  practiceItem: string
}

export type GeneralQuestions = {
  industryBelong: string
  amountEmployees: string
  companyPosition: string
  comprehensiveness: number
  consistency: number
  problemAdequacy: number
}

export type GeneralQuestionsDocument = {
  id: string
  data: () => GeneralQuestions
}

export type SurveyList = {
  answerValue: number
  digitalCapability: string
  focusArea: string
  practiceItem: string
}
