import { useEffect, useState } from 'react'
import tw, { styled, css } from 'twin.macro'
import * as t from '../types'

type Props = {
  generalQuestions: t.GeneralQuestionsAnswer
  setGeneralQuestions: (answer: t.GeneralQuestionsAnswer) => void
  setShowGeneralQuestions: (bool: boolean) => void
  setShowSurvey: (bool: boolean) => void
  localDocRef: string
  firestore: any
}

const GeneralQuestions = (props: Props) => {
  const postgeneralQuestion = async () => {
    const newAnswerRef = props.firestore
      .collection('surveys')
      .doc(props.localDocRef)
    await newAnswerRef.set(props.generalQuestions, { merge: true })
  }

  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    if (
      props.generalQuestions.amountEmployees?.trim().length !== 0 &&
      props.generalQuestions.companyPosition?.trim().length !== 0 &&
      props.generalQuestions.industryBelong?.trim().length !== 0
    ) {
      setIsEmpty(false)
    }
  }, [props.generalQuestions])

  return (
    <Wrapper>
      <h2>General Questions</h2>
      <h3>How many employees work in the company?</h3>
      <Select
        onChange={(e) => {
          props.setGeneralQuestions({
            ...props.generalQuestions,
            amountEmployees: e.target.value,
          })
        }}
      >
        <option className="placeholder">Please choose an option.</option>
        <option value="1-249">1-249</option>
        <option value="250-999">250-999</option>
        <option value=">1000">greater 1000</option>
      </Select>
      <h3>To which industry does the company belong?</h3>
      <Input
        placeholder="Your answer (up to 50 chars)"
        type="text"
        maxLength={50}
        onChange={(e) => {
          props.setGeneralQuestions({
            ...props.generalQuestions,
            industryBelong: e.target.value,
          })
        }}
      ></Input>
      <h3>What is your position in the company?</h3>

      <Input
        placeholder="Your answer (up to 50 chars)"
        type="text"
        maxLength={50}
        onChange={(e) => {
          props.setGeneralQuestions({
            ...props.generalQuestions,
            companyPosition: e.target.value,
          })
        }}
      ></Input>
      <Button
        disabled={isEmpty}
        onClick={() => {
          postgeneralQuestion()
          props.setShowGeneralQuestions(false)
          props.setShowSurvey(true)
        }}
      >
        Start survey
      </Button>
    </Wrapper>
  )
}

export default GeneralQuestions

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
`

const Select = styled.select`
  ${tw`
    py-2 px-1 m-0
    rounded-md shadow-sm border border-gray-300
    focus:outline-none focus:ring focus:ring-indigo-400
    bg-white
  `}
`

const Input = styled.input`
  ${tw`
    w-full 
    p-2 m-0
    rounded-md shadow-sm border border-gray-300
    focus:outline-none focus:ring focus:ring-indigo-400
    placeholder-black text-black
  `}
`

const Button = styled.button`
  ${tw`
    py-2 px-6 mt-4
    bg-indigo-600 rounded-md text-white
    focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-500
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
`
