import * as t from '../types';

type Props = {
  setShowResults: (bool: boolean) => void;
  postFeedback: () => void;
  feedback: t.FeedbackAnswer;
  setFeedback: (answer: t.FeedbackAnswer) => void;
  setShowFeedback: (bool: boolean) => void;
};

const Feedback = (props: Props) => {
  let comprehensivenessInput: boolean[] = [
    false,
    false,
    false,
    false,
    false,
  ];
  let consistencyInput: boolean[] = [
    false,
    false,
    false,
    false,
    false,
  ];
  let problemAdequacyInput: boolean[] = [
    false,
    false,
    false,
    false,
    false,
  ];
  return (
    <div>
      <h2>Great!</h2>
      <h4>You have successfully passed all assessment questions!</h4>
      <p>
        In order to improve our tool continously, I would like to ask
        you for some feedback. Please rate the assessment tool
        including all dimensions, digital capabilities and practice
        items with regard to the three criteria:
      </p>
      <p>Comprehensiveness, consistency and problem adequacy</p>
      <p>No comprehensiveness</p>
      {comprehensivenessInput.map((comprehensivenessInput, i) => {
        return (
          <input
            key={i + 1}
            type="radio"
            name="comprehensivenessInput"
            checked={comprehensivenessInput[i]}
            onClick={() => {
              props.setFeedback({
                ...props.feedback,
                comprehensiveness: i + 1,
              });
              // @ts-ignore
              comprehensivenessInput = [
                false,
                false,
                false,
                false,
                false,
              ];
              comprehensivenessInput[i] = true;
            }}></input>
        );
      })}
      <p>Full comprehensiveness</p>
      <p>No consistency</p>
      {consistencyInput.map((consistencyInput, i) => {
        return (
          <input
            key={i + 1}
            type="radio"
            name="consistencyInput"
            checked={consistencyInput[i]}
            onClick={() => {
              props.setFeedback({
                ...props.feedback,
                consistency: i + 1,
              });
              //@ts-ignore
              consistencyInput = [false, false, false, false, false];
              consistencyInput[i] = true;
            }}></input>
        );
      })}
      <p>Full consistency</p>
      <p>No problem adequacy</p>
      {problemAdequacyInput.map((problemAdequacyInput, i) => {
        return (
          <input
            key={i + 1}
            type="radio"
            name="problemAdequacyInput"
            checked={problemAdequacyInput[i]}
            onClick={() => {
              props.setFeedback({
                ...props.feedback,
                problemAdequacy: i + 1,
              });
              //@ts-ignore
              problemAdequacyInput = [
                false,
                false,
                false,
                false,
                false,
              ];
              problemAdequacyInput[i] = true;
            }}></input>
        );
      })}
      <p>Full problem adequacy</p>
      <button
        onClick={() => {
          props.setShowResults(true);
          props.setShowFeedback(false);
          props.postFeedback();
        }}>
        Finish Survey
      </button>
    </div>
  );
};

export default Feedback;
