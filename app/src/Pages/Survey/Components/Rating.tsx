import { useEffect, useState } from 'react';

type Props = {
  min: string;
  max: string;
  questionId?: string;
  setRaiting: ({ questionId: string, value: number }) => void;
  text: boolean;
  answer: number;
};

const Raiting = (props: Props) => {
  let [inputs, setInputs] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    if (props.answer !== 0 && props.answer !== undefined) {
      const answerFromFirestore = [...inputs];
      answerFromFirestore[props.answer - 1] = true;
      setInputs(answerFromFirestore);
      props.setRaiting({
        questionId: props.questionId,
        value: [props.answer - 1],
      });
    }
  }, [props.answer]);

  const changeInput = (i) => {
    const updateInput = [...inputs];
    updateInput[i] = true;
    setInputs(updateInput);
  };

  return (
    <div>
      {props.text && (
        <div>
          <p>Rate your company</p>
          <p>
            To which level has your company implemented the practice
            item
          </p>
        </div>
      )}
      <div>
        <p>{props.min}</p>
        <div>
          {inputs.map((input, i) => {
            return (
              <input
                key={i}
                type="radio"
                name="radio"
                checked={input}
                onClick={() => {
                  props.setRaiting({
                    questionId: props.questionId,
                    value: 1,
                  });
                  setInputs([false, false, false, false, false]);
                  changeInput(i);
                  console.log(input);
                }}></input>
            );
          })}
        </div>
        <p>{props.max}</p>
      </div>
    </div>
  );
};

export default Raiting;
