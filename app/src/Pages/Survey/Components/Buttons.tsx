import { countReset } from 'console';
import * as t from '../types';

type Props = {
  postAnswers: () => void;
  counter: t.Counter;
  setCounter: ({ value: number }) => void;
  amountQuestions: number;
};

const Buttons = (props: Props) => {
  return (
    <div className="flex">
      {props.counter.value > 0 && (
        <button
          className="mt-5 mr-4 justify-center px-4 py-2 font-medium text-indigo-600 bg-white border-indigo-600 border border-transparent rounded-md mt-50 group hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            /* props.postAnswers() */ props.setCounter({
              value: props.counter.value - 1,
            });
          }}>
          Previous Question
        </button>
      )}
      {props.amountQuestions - 1 === props.counter.value && (
        <button
          className="mt-5 justify-center px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md mt-50 group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            props.postAnswers();
          }}>
          Finish Survey
        </button>
      )}
      {props.amountQuestions > 1 &&
        props.amountQuestions - 1 !== props.counter.value && (
          <button
            className="mt-5 justify-center px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md mt-50 group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              /* props.postAnswers() */ props.setCounter({
                value: props.counter.value + 1,
              });
            }}>
            Next Question
          </button>
        )}
    </div>
  );
};

export default Buttons;
