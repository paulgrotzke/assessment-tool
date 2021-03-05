import * as t from '../types'
import tw, { styled } from 'twin.macro'

type Props = {
  setRaiting: (raiting: t.Raiting) => void
  question: t.Question
}

const Raiting = (props: Props) => {
  let bubbles = new Array(5).fill(false)

  return (
    <Wrapper>
      <h3>Rate your company</h3>
      <p>
        To which level has your company <b>implemented</b> the practice item
      </p>
      <Checkboxes>
        <p className="text-left">Not</p>
        {bubbles.map((input, i) => {
          return (
            <Input
              className="bubbles"
              key={i + 1}
              type="radio"
              name="radio"
              checked={input[i]}
              onClick={() => {
                props.setRaiting({
                  questionId: props.question.id,
                  value: i + 1,
                  focusArea: props.question.focusArea,
                  digitalCapability: props.question.digitalCapability,
                  practiceItem: props.question.practiceItem,
                })
                bubbles.fill(false)
                bubbles[i] = true
              }}
            ></Input>
          )
        })}
        <p className="text-right">Fully</p>
      </Checkboxes>
    </Wrapper>
  )
}

export default Raiting

const Wrapper = styled.div`
  ${tw`
      p-4 my-6
      rounded-md shadow-xl bg-gray-100
    `}

  > h2 {
    ${tw`
      mb-6
      font-extrabold text-2xl uppercase
    `}

    > .question {
      ${tw`
      text-2xl text-indigo-500
    `}
    }
  }

  > h3 {
    ${tw`
      mt-2 mb-1
      font-semibold text-lg
    `}
  }
`

const Checkboxes = styled.div`
  ${tw`
      flex 
      mt-4
    `}

  > .text-left {
    ${tw`
      flex-1 
      mr-3
      text-right font-semibold 
    `}
  }

  > .text-right {
    ${tw`
      flex-1 
      ml-3
      text-left font-semibold
    `}
  }
`

const Input = styled.input`
  ${tw`
      flex-none 
      mt-1 mx-1 
      checked:bg-indigo-500 cursor-pointer
    `}
`
