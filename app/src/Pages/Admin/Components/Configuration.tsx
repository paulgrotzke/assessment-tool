import { useState } from 'react'
import { BsTrash, BsPencil } from 'react-icons/bs'
import tw, { styled } from 'twin.macro'
import { firestore } from '../../../lib/firebase'
import useQuestions from '../../Hooks/useQuestions'
import Edit from './Edit'

type Props = {
  focusArea: string
  digitalCapability: string
  practiceItem: string
}

const Configuration = (props: Props) => {
  const questions = useQuestions()

  const [edit, setEdit] = useState(0)

  const deleteQuestion = async (questionId) => {
    const confirm = window.confirm(
      'Are you sure to delete? All answers for this questions will be deleted too.'
    )
    if (confirm) {
      await firestore.collection('questions').doc(questionId).delete()
    }
  }

  return (
    <Wrapper>
      <h2>Config current Questions</h2>
      {questions?.map((question, i) => (
        <FocusArea>
          <div className="header">
            <h3>{question.focusArea}</h3>
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

export default Configuration

const Wrapper = styled.div`
  > h2 {
    ${tw`
      mb-2 mt-6
      font-extrabold text-2xl uppercase
    `}
  }

  > h3 {
    ${tw`
      mt-2 mb-1
      font-semibold text-lg
    `}
  }
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
      col-span-10
      mb-1
      font-semibold text-xl
    `}
    }
  }
`
