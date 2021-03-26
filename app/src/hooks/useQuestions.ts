import { useCollection } from 'react-firebase-hooks/firestore'
import { firestore } from '../lib/firebase'
import * as t from '../Pages/Survey/types'

const useQuestions = () => {
  const ref = firestore.collection('questions')
  const [data] = useCollection(ref)
  const questions: t.Question[] = []
  data?.docs.map((doc: t.QuestionDocument) =>
    questions.push({
      id: doc.id,
      focusArea: doc.data().focusArea,
      digitalCapability: doc.data().digitalCapability,
      practiceItem: doc.data().practiceItem,
      listing: doc.data().listing,
      maturityStage: doc.data().maturityStage,
    })
  )

  if (questions.length !== 0) {
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j + 1 < questions.length; j++) {
        if (questions[j]['listing'] > questions[j + 1]['listing']) {
          let tmp = questions[j]
          questions[j] = questions[j + 1]
          questions[j + 1] = tmp
        }
      }
    }
  }

  return questions
}

export default useQuestions
