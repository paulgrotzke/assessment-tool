type Props = {
  min: string;
  max: string;
  questionId?: string;
  setRaiting: ({ questionId: string, value: number }) => void;
  text: boolean;
};

const Raiting = (props: Props) => {
  return (
    <div className="">
      {props.text && (
        <div>
          <p className="uppercase text-lg font-bold mt-4">
            Rate your company
          </p>
          <p className="font-semibold ">
            To which level has your company implemented the practice
            item
          </p>
        </div>
      )}
      <div className="flex mt-2">
        <p>{props.min}</p>
        <div className="mx-4">
          <input
            className="mx-1"
            type="radio"
            name="drone"
            onClick={() =>
              props.setRaiting({
                questionId: props.questionId,
                value: 1,
              })
            }></input>
          <input
            className="mx-1"
            type="radio"
            name="drone"
            onClick={() =>
              props.setRaiting({
                questionId: props.questionId,
                value: 2,
              })
            }></input>
          <input
            className="mx-1"
            type="radio"
            name="drone"
            onClick={() =>
              props.setRaiting({
                questionId: props.questionId,
                value: 3,
              })
            }></input>
          <input
            className="mx-1"
            type="radio"
            name="drone"
            onClick={() =>
              props.setRaiting({
                questionId: props.questionId,
                value: 4,
              })
            }></input>
          <input
            className="mx-1"
            type="radio"
            name="drone"
            onClick={() =>
              props.setRaiting({
                questionId: props.questionId,
                value: 5,
              })
            }></input>
        </div>
        <p>{props.max}</p>
      </div>
    </div>
  );
};

export default Raiting;
