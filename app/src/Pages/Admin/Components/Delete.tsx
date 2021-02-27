import { firestore } from '../../../lib/firebase';

type Props = {
  question: Question;
};

type Question = {
  id: string;
  focusArea: string;
  digitalCapability: string;
  practiceItem: string;
};

const Delete = (props: Props) => {
  const deleteQuestion = async (questionId: Question['id']) => {
    const confirm = window.confirm(
      'Are you sure to delete? All answers for this questions will be deleted too.',
    );
    if (confirm) {
      await firestore.collection('questions').doc(questionId).delete();
    }
  };

  return (
    <div>
      <p onClick={() => deleteQuestion(props.question.id)}>Delete</p>
    </div>
  );
};

export default Delete;
