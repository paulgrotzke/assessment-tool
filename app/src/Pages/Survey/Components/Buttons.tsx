import tw, { styled } from 'twin.macro'
import useQuestions from '../../../hooks/useQuestions'
import * as t from '../types'

type Props = {
  counter: t.Counter
  setCounter: ({ value: number }) => void
  raiting: t.Raiting
  setRaiting: (raiting: t.Raiting) => void
  setShowFeedback: (bool: boolean) => void
  setShowGeneralQuestions: (bool: boolean) => void
  localDocRef: string
  firestore: any
  question: t.Question
}

const Buttons = (props: Props) => {
  const questions = useQuestions()
  const amountQuestions = questions.length

  const postAnswer = async () => {
    const answer: t.Answer = {
      answerValue: props.raiting.value,
      focusArea: props.raiting.focusArea,
      digitalCapability: props.raiting.digitalCapability,
      practiceItem: props.raiting.practiceItem,
      maturityStage: props.question.maturityStage
    }

    const newAnswerRef = props.firestore
      .collection('surveys')
      .doc(props.localDocRef)
      .collection('answers')
      .doc(props.raiting.questionId)
    await newAnswerRef.set(answer, { merge: true })
    await newAnswerRef.set(props.counter, { merge: true })
  }

  const defaultRaiting = {
    questionId: '',
    value: false,
    digitalCapability: '',
    focusArea: '',
    practiceItem: '',
  }

  return (
    <div>
      {props.counter.value > 0 && (
        <PrevButton
          onClick={() => {
            props.setCounter({
              value: props.counter.value - 1,
            })
            props.setRaiting(defaultRaiting)
          }}
        >
          Previous
        </PrevButton>
      )}
      {props.counter.value === 0 && (
        <PrevButton
          onClick={() => {
            props.setShowGeneralQuestions(true)
            props.setRaiting(defaultRaiting)
          }}
        >
          Back to General
        </PrevButton>
      )}
      {amountQuestions - 1 === props.counter.value && (
        <Button
          disabled={props.raiting.value === false}
          onClick={() => {
            postAnswer()
            props.setShowFeedback(true)
            props.setRaiting(defaultRaiting)
          }}
        >
          Go To Feedback
        </Button>
      )}
      {amountQuestions > 1 && amountQuestions - 1 !== props.counter.value && (
        <Button
          disabled={props.raiting.value === false}
          onClick={() => {
            props.setCounter({
              value: props.counter.value + 1,
            })
            postAnswer()
            props.setRaiting(defaultRaiting)
          }}
        >
          Next Question
        </Button>
      )}
    </div>
  )
}

export default Buttons

const Button = styled.button`
  ${tw`
    py-2 px-4 mt-4
    bg-indigo-600 rounded-md
    text-white border-2 border-indigo-600
    hover:bg-indigo-500 hover:border-indigo-500
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
`

const PrevButton = styled.button`
  ${tw`
    rounded-md py-2 px-2 mt-4 mr-4
    text-indigo-600 border-2 border-indigo-600
    hover:bg-gray-100
  `}
`
