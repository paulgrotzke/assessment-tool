import * as t from '../types';

type Props = {
  setRaiting: (raiting: t.Raiting) => void;
  answer: number;
  question: t.Question;
};

const Raiting = (props: Props) => {
  let input: boolean[] = [false, false, false, false, false];

  return (
    <div>
      <div>
        <p>Rate your company</p>
        <p>
          To which level has your company implemented the practice
          item
        </p>
      </div>
      <div>
        <p>Not implemented</p>
        <div>
          {input.map((input, i) => {
            return (
              <input
                key={i + 1}
                type="radio"
                name="radio"
                checked={input[i]}
                onClick={() => {
                  props.setRaiting({
                    questionId: props.question.id,
                    value: i + 1,
                    focusArea: props.question.focusArea,
                    digitalCapability:
                      props.question.digitalCapability,
                    practiceItem: props.question.practiceItem,
                  });
                  //@ts-ignore
                  input = [false, false, false, false, false];
                  console.log(input);
                  input[i] = true;
                }}></input>
            );
          })}
        </div>
        <p>Fully implemented</p>
      </div>
    </div>
  );
};

export default Raiting;
