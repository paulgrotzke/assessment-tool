import * as t from '../types';

type Props = {
  postAnswer: () => void;
  counter: number;
  setCounter: ({ value: number }) => void;
  amountQuestions: number;
  raiting: number | boolean;
};

const Buttons = (props: Props) => {
  return (
    <div className="flex">
      {props.counter > 0 && (
        <button
          className="mt-5 mr-4 justify-center px-4 py-2 font-medium text-indigo-600 bg-white border-indigo-600 border border-transparent rounded-md mt-50 group hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
          className="disabled:opacity-50 mt-5 justify-center px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md mt-50 group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            props.postAnswer();
          }}>
          Finish Survey
        </button>
      )}
      {props.amountQuestions > 1 &&
        props.amountQuestions - 1 !== props.counter && (
          <button
            disabled={!props.raiting}
            className="disabled:opacity-50 mt-5 justify-center px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md mt-50 group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
