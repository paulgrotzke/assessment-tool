type Props = {
  min: string;
  max: string;
  questionId: string;
  setRaiting: ({ questionId: string, raiting: number }) => void;
};

const Raiting = (props: Props) => {
  return (
    <div>
      <p>{props.min}</p>
      <div>
        <input
          type="radio"
          name="drone"
          onClick={() =>
            props.setRaiting({
              questionId: props.questionId,
              raiting: 1,
            })
          }></input>
        <input
          type="radio"
          name="drone"
          onClick={() =>
            props.setRaiting({
              questionId: props.questionId,
              raiting: 2,
            })
          }></input>
        <input
          type="radio"
          name="drone"
          onClick={() =>
            props.setRaiting({
              questionId: props.questionId,
              raiting: 3,
            })
          }></input>
        <input
          type="radio"
          name="drone"
          onClick={() =>
            props.setRaiting({
              questionId: props.questionId,
              raiting: 4,
            })
          }></input>
        <input
          type="radio"
          name="drone"
          onClick={() =>
            props.setRaiting({
              questionId: props.questionId,
              raiting: 5,
            })
          }></input>
      </div>
      <p>{props.max}</p>
    </div>
  );
};

export default Raiting;
