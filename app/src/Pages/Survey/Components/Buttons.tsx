import tw, { styled } from 'twin.macro';
import useQuestions from '../../Hooks/useQuestions';
import * as t from '../types';

type Props = {
  counter: t.Counter;
  setCounter: ({ value: number }) => void;
  raiting: t.Raiting;
  setShowFeedback: (bool: boolean) => void;
  localDocRef: string;
  firestore: any;
};

const Buttons = (props: Props) => {
  const questions = useQuestions();
  const amountQuestions = questions.length;

  const postAnswer = async () => {
    const answer: t.Answer = {
      answerValue: props.raiting.value,
      focusArea: props.raiting.focusArea,
      digitalCapability: props.raiting.digitalCapability,
      practiceItem: props.raiting.practiceItem,
    };
    console.log(answer);
    console.log(props.counter);

    const newAnswerRef = props.firestore
      .collection('surveys')
      .doc(props.localDocRef)
      .collection('answers')
      .doc(props.raiting.questionId);
    await newAnswerRef.set(answer, { merge: true });
    await newAnswerRef.set(props.counter, { merge: true });
  };

  return (
    <div>
      {console.log(props.raiting)}
      {props.counter.value > 0 && (
        <Button
          onClick={() => {
            props.setCounter({
              value: props.counter.value - 1,
            });
            postAnswer();
          }}>
          Previous Question
        </Button>
      )}
      {amountQuestions - 1 === props.counter.value && (
        <Button
          disabled={!props.raiting}
          onClick={() => {
            postAnswer();
            props.setShowFeedback(true);
          }}>
          Go To Feedback
        </Button>
      )}
      {amountQuestions > 1 &&
        amountQuestions - 1 !== props.counter.value && (
          <Button
            disabled={!props.raiting}
            onClick={() => {
              props.setCounter({
                value: props.counter.value + 1,
              });
              postAnswer();
            }}>
            Next Question
          </Button>
        )}
    </div>
  );
};

export default Buttons;

const Button = styled.button`
  ${tw`
    bg-indigo-600 rounded-md py-2 px-6 mt-4
    text-white
    focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-500
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
`;