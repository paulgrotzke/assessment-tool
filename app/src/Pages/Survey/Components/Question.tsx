import * as t from '../types';

const Question = (props: Props) => {
  return (
    <div className="w-full max-w-md">
      <p className="uppercase text-lg font-bold">Focus area</p>
      <p className="mt-0">{props.question.focusArea}</p>
      <p className="uppercase text-lg font-bold mt-4">
        Digital Capability
      </p>
      <p>{props.question.digitalCapability}</p>
      <p className="uppercase text-lg font-bold mt-4">
        Practice Item
      </p>
      <p>{props.question.practiceItem}</p>
    </div>
  );
};

export default Question;

type Props = {
  question: t.Question;
};
