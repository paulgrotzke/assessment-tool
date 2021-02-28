import * as t from '../types';
import tw, { styled } from 'twin.macro';

type Props = {
  setRaiting: (raiting: t.Raiting) => void;
  question: t.Question;
};

const Raiting = (props: Props) => {
  let input = new Array(5).fill(false);

  return (
    <Wrapper>
      <h3>Rate your company</h3>
      <p>To which level has your company implemented the practice item</p>
      <Checkboxes>
        <p className="text-left">Not implemented</p>
        {input.map((input, i) => {
          return (
            <input
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
                });
                input.fill(false);
                input[i] = true;
              }}></input>
          );
        })}
        <p className="text-right">Fully implemented</p>
      </Checkboxes>
    </Wrapper>
  );
};

export default Raiting;

const Wrapper = styled.div`
  ${tw`
      rounded-md shadow-xl p-4
    `}

  > h2 {
    ${tw`
      mb-6
      pt-8
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
      mt-4
      mb-1
      font-semibold text-lg
    `}
  }
`;

const Checkboxes = styled.div`
  ${tw`
      flex mt-2 w-full
    `}

  > .text-left {
    ${tw`
      flex-1 text-left font-semibold
    `}
  }

  > .text-right {
    ${tw`
      flex-1 text-right font-semibold
    `}
  }

  > .bubbles {
    ${tw`
      flex-none mt-1 mx-1
    `}
  }
`;
