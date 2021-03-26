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
        <p className="text-left">Not implemented</p>
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
                  value: i,
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
        <p className="text-right">Fully implemented</p>
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
      font-light text-3xl uppercase 
    `}

    > .question {
      ${tw`
      text-3xl text-indigo-500
    `}
    }
  }

  > h3 {
    ${tw`
      mt-2 mb-1
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
      mt-4
    `}

  > .text-left {
    ${tw`
      flex-1 
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
      mt-1 mx-1 
      checked:bg-indigo-500 cursor-pointer
    `}
`
