import useQuestions from '../Hooks/useQuesations';

type Props = {
  postAnswer: () => void;
  counter: number;
  setCounter: ({ value: number }) => void;
  raiting: number | boolean;
  answer: number;
  setShowFeedback: (bool: boolean) => void;
};

const Buttons = (props: Props) => {
  const questions = useQuestions();
  const amountQuestions = questions.length;
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
      {amountQuestions - 1 === props.counter && (
        <button
          disabled={!props.raiting}
          onClick={() => {
            props.postAnswer();
            props.setShowFeedback(true);
          }}>
          Finish Survey
        </button>
      )}
      {amountQuestions > 1 && amountQuestions - 1 !== props.counter && (
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
