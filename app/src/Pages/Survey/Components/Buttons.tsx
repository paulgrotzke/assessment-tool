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
        <button
          onClick={() => {
            props.setCounter({
              value: props.counter.value - 1,
            });
            postAnswer();
          }}>
          Previous Question
        </button>
      )}
      {amountQuestions - 1 === props.counter.value && (
        <button
          disabled={!props.raiting}
          onClick={() => {
            postAnswer();
            props.setShowFeedback(true);
          }}>
          Go To Feedback
        </button>
      )}
      {amountQuestions > 1 &&
        amountQuestions - 1 !== props.counter.value && (
          <button
            disabled={!props.raiting}
            onClick={() => {
              props.setCounter({
                value: props.counter.value + 1,
              });
              postAnswer();
            }}>
            Next Question
          </button>
        )}
    </div>
  );
};

export default Buttons;
