import { useCollection } from 'react-firebase-hooks/firestore'
import { firestore } from '../../lib/firebase'
import * as t from '../Survey/types'

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
    })
  )
  return questions
}

export default useQuestions
