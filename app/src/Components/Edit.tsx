import React, { useState } from 'react';
import { firestore } from '../lib/firebase';

type Props = {
  question: Question;
};

type Question = {
  id: string;
  focusArea: string;
  digital: string;
  practiceItem: string;
};

const Edit = ({ changeEditState }) => {
  const [editFocusArea, setEditFocusArea] = useState('');
  const [editDigital, setEditDigital] = useState('');
  const [editPracticeItem, setEditPracticeItem] = useState('');

  const updateQuestion = async (questionId: Question['id']) => {
    await firestore.collection('questions').doc(questionId).update({
      practiceItem: 'foo',
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
      {/* <p
        onClick={() => {
          updateQuestion(props.question.id);
          props.setEdit(false);
        }}>
        save
      </p> */}
      <p onClick={changeEditState}>cancel</p>
    </div>
  );
};

export default Edit;
