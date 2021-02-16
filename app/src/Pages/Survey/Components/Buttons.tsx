import { useHistory } from 'react-router-dom';
import * as t from '../types';

type Props = {
  postAnswer: () => void;
  counter: number;
  setCounter: ({ value: number }) => void;
  amountQuestions: number;
  raiting: number | boolean;
  answer: number;
};

const Buttons = (props: Props) => {
  const history = useHistory();

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
            history.push('/feedback');
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
