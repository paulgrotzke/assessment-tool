import { useState } from 'react';
import { firestore } from '../lib/firebase';

type Props = {
  question: Question;
  changeEditState: () => void;
};

type Question = {
  id: string;
  focusArea: string;
  digitalCapability: string;
  practiceItem: string;
};

const Edit = (props: Props) => {
  const [editFocusArea, setEditFocusArea] = useState(
    props.question.focusArea,
  );
  const [editDigital, setEditDigital] = useState(
    props.question.digitalCapability,
  );
  const [editPracticeItem, setEditPracticeItem] = useState(
    props.question.practiceItem,
  );

  const updateQuestion = async (questionId: Question['id']) => {
    await firestore.collection('questions').doc(questionId).update({
      focusArea: editFocusArea,
      digitalCapability: editDigital,
      practiceItem: editPracticeItem,
    });
  };

  return (
    <div>
      <input
        placeholder="Insert focus area"
        value={editFocusArea}
        onChange={(e) => setEditFocusArea(e.target.value)}></input>
      <p>Digital Capability:</p>
      <input
        placeholder="Insert digital capability"
        value={editDigital}
        onChange={(e) => setEditDigital(e.target.value)}></input>
      <p>Practice Item</p>
      <input
        placeholder="Insert practice item"
        value={editPracticeItem}
        onChange={(e) => setEditPracticeItem(e.target.value)}></input>
      <p
        onClick={() => {
          updateQuestion(props.question.id);
          props.changeEditState();
        }}>
        save
      </p>
      <p onClick={props.changeEditState}>cancel</p>
    </div>
  );
};

export default Edit;
