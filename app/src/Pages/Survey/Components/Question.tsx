import * as t from '../types';

const Question = (props: Props) => {
  return (
    <div>
      <p>Focus area</p>
      <p>{props.question.focusArea}</p>
      <p>Digital Capability</p>
      <p>{props.question.digitalCapability}</p>
      <p>Practice Item</p>
      <p>{props.question.practiceItem}</p>
    </div>
  );
};

export default Question;

type Props = {
  question: t.Question;
};
