import { useState } from 'react'
import { BsTrash, BsPencil, BsArrowUp, BsArrowDown } from 'react-icons/bs'
import tw, { styled } from 'twin.macro'
import { firestore } from '../../../lib/firebase'
import useQuestions from '../../../hooks/useQuestions'
import Edit from './Edit'

type Props = {
  focusArea: string
  setFocusArea: (bostringol: string) => void
  digitalCapability: string
  setDigitalCapability: (string: string) => void
  practiceItem: string
  setPracticeItem: (string: string) => void
  maturityStage: string
  setMaturityStage: (string: string) => void
}

const NewQuestion = (props: Props) => {
  const questions = useQuestions()
  const [edit, setEdit] = useState(0)

  const postQuestion = async () => {
    const newQuestionRef = firestore.collection('questions').doc()

    const data = {
      focusArea: props.focusArea,
      digitalCapability: props.digitalCapability,
      practiceItem: props.practiceItem,
      maturityStage: props.maturityStage,
      listing: questions.length + 1,
    }
    await newQuestionRef.set(data)
  }

  const deleteQuestion = async (questionId) => {
    const confirm = window.confirm(
      'Are you sure to delete? All answers for this questions will be deleted too.'
    )
    if (confirm) {
      await firestore.collection('questions').doc(questionId).delete()
    }
  }

  const updateQuestion = async (questionId, listing) => {
    await firestore.collection('questions').doc(questionId).update({
      listing: listing,
    })
  }

  const sortUp = (question, i) => {
    updateQuestion(questions[i]['id'], questions[i]['listing'] - 1)
    updateQuestion(questions[i - 1]['id'], questions[i - 1]['listing'] + 1)
  }

  const sortDown = (question, i) => {
    updateQuestion(questions[i]['id'], questions[i]['listing'] + 1)
    updateQuestion(questions[i + 1]['id'], questions[i + 1]['listing'] - 1)
  }

  return (
    <Wrapper>
      <h2>Add new questions</h2>
      <h3>Capability area</h3>
      <Input
        placeholder="Insert focus area"
        value={props.focusArea}
        onChange={(e) => props.setFocusArea(e.target.value)}
      ></Input>
      <h3>Digital Capability</h3>
      <Input
        placeholder="Insert digital capability"
        value={props.digitalCapability}
        onChange={(e) => props.setDigitalCapability(e.target.value)}
      ></Input>
      <h3>Practice Item</h3>
      <Input
        placeholder="Insert practice item"
        value={props.practiceItem}
        onChange={(e) => props.setPracticeItem(e.target.value)}
      ></Input>
      <h3>Maturity stage</h3>
      <Input
        placeholder="Insert maturity stage "
        value={props.maturityStage}
        onChange={(e) => props.setMaturityStage(e.target.value)}
      ></Input>
      <Button onClick={() => postQuestion()}>Create</Button>
      <h2>Config current Questions</h2>
      {questions?.map((question, i) => (
        <FocusArea>
          <div className="header">
            <h3>{question.focusArea}</h3>
            {i > 0 && <BsArrowUp onClick={() => sortUp(question, i)} />}
            {i + 1 < questions.length && (
              <BsArrowDown onClick={() => sortDown(question, i)} />
            )}
            <BsPencil
              onClick={() => {
                setEdit(i + 1)
              }}
            />
            <BsTrash onClick={() => deleteQuestion(question.id)} />
          </div>
          <div>{question.digitalCapability}</div>
          <div>{question.practiceItem}</div>
          {edit === i + 1 && <Edit question={question} setEdit={setEdit} />}
        </FocusArea>
      ))}
    </Wrapper>
  )
}

/* 
addQuestion(1)
*/

export default NewQuestion

const Wrapper = styled.div`
  > h2 {
    ${tw`
      mb-2 mt-6
      font-light text-3xl uppercase 
    `}
  }

  > h3 {
    ${tw`
      mt-2 mb-1
      font-medium text-lg 
    `}
  }
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
    bg-indigo-600 rounded-md
    text-white
    focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-500
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
`

const FocusArea = styled.div`
  ${tw`
    p-4 my-6 
    rounded-md shadow-xl bg-gray-100
  `}

  > .header {
    ${tw`
      grid grid-cols-12
    `}

    > h3 {
      ${tw`
      col-span-8
      mb-1
      font-medium text-xl 
    `}
    }
  }
`
