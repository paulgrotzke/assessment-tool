import { useState } from 'react';
import * as t from '../types';

type Props = {
  setShowResults: (bool: boolean) => void;
  setShowFeedback: (bool: boolean) => void;
  localDocRef: string;
  firestore: any;
};

const Feedback = (props: Props) => {
  let comprehensivenessInput = new Array(5).fill(false);
  let consistencyInput = new Array(5).fill(false);
  let problemAdequacyInput = new Array(5).fill(false);

  const [feedback, setFeedback] = useState<t.FeedbackAnswer>({
    comprehensiveness: 0,
    consistency: 0,
    problemAdequacy: 0,
  });

  const postFeedback = async () => {
    const newAnswerRef = props.firestore.collection('surveys').doc(props.localDocRef);
    await newAnswerRef.set(feedback, { merge: true });
  };

  return (
    <div>
      <h2>Great!</h2>
      <h4>You have successfully passed all assessment questions!</h4>
      <p>
        In order to improve our tool continously, I would like to ask you for some
        feedback. Please rate the assessment tool including all dimensions, digital
        capabilities and practice items with regard to the three criteria:
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
              setFeedback({
                ...feedback,
                comprehensiveness: i + 1,
              });
              comprehensivenessInput.fill(false);
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
              setFeedback({
                ...feedback,
                consistency: i + 1,
              });
              consistencyInput.fill(false);
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
              setFeedback({
                ...feedback,
                problemAdequacy: i + 1,
              });
              problemAdequacyInput.fill(false);
              problemAdequacyInput[i] = true;
            }}></input>
        );
      })}
      <p>Full problem adequacy</p>
      <button
        onClick={() => {
          props.setShowResults(true);
          props.setShowFeedback(false);
          postFeedback();
        }}>
        Finish Survey
      </button>
    </div>
  );
};

export default Feedback;
