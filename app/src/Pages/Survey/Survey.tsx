import { useState } from 'react'
import { firestore } from '../../lib/firebase'
import * as t from './types'
import useLocalDocRef from './hooks/useLocalDocRef'
import useQuestions from '../../hooks/useQuestions'
import AuthCheck from '../../Components/AuthCheck'
import Buttons from './Components/Buttons'
import Feedback from './Components/Feedback'
import GeneralQuestions from './Components/GeneralQuestions'
import Raiting from './Components/Rating'
import Results from './Components/Results'
import Question from './Components/Question'
import tw, { styled } from 'twin.macro'
import Disclaimer from './Disclaimer'

const Survey = () => {
  const localDocRef = useLocalDocRef()
  const questions = useQuestions()

  const [showFeedback, setShowFeedback] = useState<boolean>(false)
  const [showResults, setShowResults] = useState<boolean>(false)
  const [showSurvey, setShowSurvey] = useState<boolean>(false)
  const [showGeneralQuestions, setShowGeneralQuestions] = useState<boolean>(
    false
  )
  const [
    generalQuestions,
    setGeneralQuestions,
  ] = useState<t.GeneralQuestionsAnswer>({
    industryBelong: '',
    amountEmployees: '',
    companyPosition: '',
  })
  const [counter, setCounter] = useState<t.Counter>({ value: 0 })
  const [raiting, setRaiting] = useState<t.Raiting>({
    questionId: '',
    value: false,
    digitalCapability: '',
    focusArea: '',
    practiceItem: '',
  })

  if (showResults)
    return (
      <AuthCheck role="user">
        <Wrapper tw="h-5/6">
          <Results />
        </Wrapper>
      </AuthCheck>
    )

  if (showGeneralQuestions)
    return (
      <AuthCheck role="user">
        <Wrapper>
          <GeneralQuestions
            generalQuestions={generalQuestions}
            setGeneralQuestions={setGeneralQuestions}
            setShowGeneralQuestions={setShowGeneralQuestions}
            setShowSurvey={setShowSurvey}
            localDocRef={localDocRef}
            firestore={firestore}
          />
        </Wrapper>
      </AuthCheck>
    )

  if (showFeedback)
    return (
      <AuthCheck role="user">
        <Wrapper>
          <Feedback
            setShowResults={setShowResults}
            setShowFeedback={setShowFeedback}
            localDocRef={localDocRef}
            firestore={firestore}
          />
        </Wrapper>
      </AuthCheck>
    )

  if (showSurvey)
    return (
      <AuthCheck role="user">
        <Wrapper>
          {questions.map((question, i) => {
            if (counter.value === i) {
              return (
                <div key={i}>
                  <Question
                    question={question}
                    counter={counter}
                    questionLength={questions.length}
                  />
                  <Raiting setRaiting={setRaiting} question={question} />
                  <Buttons
                    counter={counter}
                    setCounter={setCounter}
                    raiting={raiting}
                    setRaiting={setRaiting}
                    setShowGeneralQuestions={setShowGeneralQuestions}
                    setShowFeedback={setShowFeedback}
                    localDocRef={localDocRef}
                    firestore={firestore}
                    question={question}
                  />
                </div>
              )
            }
            return <div key={i}></div>
          })}
        </Wrapper>
      </AuthCheck>
    )

  return (
    <AuthCheck role="user">
      <Wrapper>
        <Disclaimer
          setShowGeneralQuestions={setShowGeneralQuestions}
        ></Disclaimer>
      </Wrapper>
    </AuthCheck>
  )
}

export default Survey

const Wrapper = styled.div`
  ${tw`
    h-auto w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-6/12 2xl:w-6/12
    overflow-y-auto
    px-4 py-6
    bg-white rounded-md shadow-2xl
    print:w-auto print:h-auto print:overflow-visible print:p-10
  `}
`
