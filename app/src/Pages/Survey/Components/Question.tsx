import * as t from '../types';
import tw, { styled } from 'twin.macro';

type Props = {
  question: t.Question;
  counter: t.Counter;
  questionLength: number;
};

const Question = (props: Props) => {
  return (
    <Wrapper>
      {console.log(props.counter.value)}
      <h2>
        Question <span className="question">{props.counter.value + 1} </span>
        of {props.questionLength}
      </h2>
      <h3>Focus area</h3>
      <p>{props.question.focusArea}</p>
      <h3>Digital Capability</h3>
      <p>{props.question.digitalCapability}</p>
      <h3>Practice Item</h3>
      <p>{props.question.practiceItem}</p>
    </Wrapper>
  );
};

export default Question;

const Wrapper = styled.div`
  > h2 {
    ${tw`
      mb-6
      pt-8
      font-extrabold text-2xl uppercase
    `}

    > .question {
      ${tw`
      text-2xl text-indigo-600
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
