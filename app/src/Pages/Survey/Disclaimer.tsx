import { useHistory } from 'react-router-dom';
import { firestore } from '../../lib/firebase';

const Disclaimer = () => {
  const history = useHistory();

  const createDoc = () => {
    if (!localStorage.getItem('docRef')) {
      firestore
        .collection('answers')
        .add({})
        .then((docRef) => {
          localStorage.setItem('docRef', docRef.id);
        })
        .catch((e) => {});
      history.push('/survey');
    } else {
      history.push('/survey');
    }
  };

  return (
    <div>
      <div>
        <h1>Brief explanation of the assessment tool</h1>
        <p>You will be guided through assessmenmt questions step by step</p>
        <p>
          Your data will be stored anonymously, secure and will only be used for
          scientiffic purposes
        </p>
        <p>Assessment will take about 20-30min</p>
        <p>
          At the end of the assessment, you will be asked for your email address so that
          we can send you a comprehensive evaluation in PDF format
        </p>
        <button type="button" onClick={createDoc}>
          Start assessment
        </button>
      </div>
    </div>
  );
};

export default Disclaimer;
