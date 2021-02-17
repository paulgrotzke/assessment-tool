type Props = {
  postAnswer: () => void;
  counter: number;
  setCounter: ({ value: number }) => void;
  amountQuestions: number;
  raiting: number | boolean;
  answer: number;
  setShowFeedback: (bool: boolean) => void;
};

const Buttons = (props: Props) => {
  return (
    <div>
      {props.counter > 0 && (
        <button
          onClick={() => {
            props.postAnswer();
            props.setCounter({
              value: props.counter - 1,
            });
          }}>
          Previous Question
        </button>
      )}
      {props.amountQuestions - 1 === props.counter && (
        <button
          disabled={!props.raiting}
          onClick={() => {
            props.postAnswer();
            props.setShowFeedback(true);
          }}>
          Finish Survey
        </button>
      )}
      {props.amountQuestions > 1 &&
        props.amountQuestions - 1 !== props.counter && (
          <button
            disabled={!props.raiting}
            onClick={() => {
              props.postAnswer();
              props.setCounter({
                value: props.counter + 1,
              });
            }}>
            Next Question
          </button>
        )}
    </div>
  );
};

export default Buttons;
