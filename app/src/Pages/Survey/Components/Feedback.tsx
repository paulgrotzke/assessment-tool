import { useState } from 'react'
import tw, { styled } from 'twin.macro'
import * as t from '../types'

type Props = {
  setShowResults: (bool: boolean) => void
  setShowFeedback: (bool: boolean) => void
  localDocRef: string
  firestore: any
}

const Feedback = (props: Props) => {
  let comprehensivenessInput = new Array(5).fill(false)
  let consistencyInput = new Array(5).fill(false)
  let problemAdequacyInput = new Array(5).fill(false)

  const [feedback, setFeedback] = useState<t.FeedbackAnswer>({
    comprehensiveness: null,
    consistency: null,
    problemAdequacy: null,
  })

  const postFeedback = async () => {
    const newAnswerRef = props.firestore
      .collection('surveys')
      .doc(props.localDocRef)
    await newAnswerRef.set(feedback, { merge: true })
  }

  return (
    <Wrapper>
      <h2>Great!</h2>
      <h4>You have successfully passed all assessment questions!</h4>
      <p>
        In order to improve our tool continously, I would like to ask you for
        some feedback. Please rate the assessment tool including all dimensions,
        digital capabilities and practice items with regard to the three
        criteria:
      </p>
      <div className="area">
        <h4>Comprehensiveness</h4>
        <Checkboxes>
          <p className="text-left">No comprehensiveness</p>
          {comprehensivenessInput.map((input, i) => {
            return (
              <Input
                key={i + 1}
                type="radio"
                name="comprehensivenessInput"
                checked={input[i]}
                onClick={() => {
                  setFeedback({
                    ...feedback,
                    comprehensiveness: i,
                  })
                  comprehensivenessInput.fill(false)
                  comprehensivenessInput[i] = true
                }}
              ></Input>
            )
          })}
          <p className="text-right">Full comprehensiveness</p>
        </Checkboxes>
      </div>
      <div className="area">
        <h4>Consistency</h4>
        <Checkboxes>
          <p className="text-left">No consistency</p>
          {consistencyInput.map((input, i) => {
            return (
              <Input
                key={i + 1}
                type="radio"
                name="consistencyInput"
                checked={input[i]}
                onClick={() => {
                  setFeedback({
                    ...feedback,
                    consistency: i,
                  })
                  consistencyInput.fill(false)
                  consistencyInput[i] = true
                }}
              ></Input>
            )
          })}
          <p className="text-right">Full consistency</p>
        </Checkboxes>
      </div>
      <div className="area">
        <h4>Problem adequacy</h4>
        <Checkboxes>
          <p className="text-left">No problem adequacy</p>
          {problemAdequacyInput.map((input, i) => {
            return (
              <Input
                key={i + 1}
                type="radio"
                name="problemAdequacyInput"
                checked={input[i]}
                onClick={() => {
                  setFeedback({
                    ...feedback,
                    problemAdequacy: i,
                  })
                  problemAdequacyInput.fill(false)
                  problemAdequacyInput[i] = true
                }}
              ></Input>
            )
          })}
          <p className="text-right">Full problem adequacy</p>
        </Checkboxes>
      </div>
      <Button
        disabled={
          feedback.comprehensiveness === null ||
          feedback.consistency === null ||
          feedback.problemAdequacy === null
        }
        onClick={() => {
          props.setShowResults(true)
          props.setShowFeedback(false)
          postFeedback()
        }}
      >
        Finish Survey
      </Button>
    </Wrapper>
  )
}

export default Feedback

const Wrapper = styled.div`
  > h2 {
    ${tw`
      mb-6 pt-8 
      font-light text-3xl uppercase 
    `}
  }

  > h3 {
    ${tw`
      mt-4 mb-1 
      font-medium text-lg 
    `}
  }

  > .area {
    ${tw`
      my-6 py-3
      rounded-md shadow-2xl bg-gray-100 text-center
    `}

    ${tw`
      mt-4 mb-1 
      font-medium text-lg
    `}
  }
`

const Checkboxes = styled.div`
    ${tw`
      break-all block
    `}
  ${tw`
      flex 
      font-medium
    `}

  > .text-left {
    ${tw`
      flex-1 break-words
      mr-1 sm:mr-3
      text-right font-medium text-xs sm:text-base
    `}
  }

  > .text-right {
    ${tw`
      flex-1
      ml-1 sm:ml-3
      text-left font-medium text-xs sm:text-base
    `}
  }
`

const Input = styled.input`
  ${tw`
      flex-none 
      my-1 mx-1
      checked:bg-indigo-500
    `}
`

const Button = styled.button`
  ${tw`
    py-2 px-6 mt-4
    text-white bg-indigo-600 rounded-md 
    focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-500
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
`
