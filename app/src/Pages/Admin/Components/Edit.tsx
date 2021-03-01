import { useState } from 'react';
import { firestore } from '../../../lib/firebase';
import tw, { styled } from 'twin.macro';

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
  const [editFocusArea, setEditFocusArea] = useState(props.question.focusArea);
  const [editDigitalCapability, setEditDigitalCapability] = useState(
    props.question.digitalCapability,
  );
  const [editPracticeItem, setEditPracticeItem] = useState(props.question.practiceItem);

  const updateQuestion = async (questionId: Question['id']) => {
    await firestore.collection('questions').doc(questionId).update({
      focusArea: editFocusArea,
      digitalCapability: editDigitalCapability,
      practiceItem: editPracticeItem,
    });
  };

  return (
    <Wrapper>
      <Input
        placeholder="Insert focus area"
        value={editFocusArea}
        onChange={(e) => setEditFocusArea(e.target.value)}></Input>
      <p>Digital Capability:</p>
      <Input
        placeholder="Insert digital capability"
        value={editDigitalCapability}
        onChange={(e) => setEditDigitalCapability(e.target.value)}></Input>
      <p>Practice Item</p>
      <Input
        placeholder="Insert practice item"
        value={editPracticeItem}
        onChange={(e) => setEditPracticeItem(e.target.value)}></Input>
      <Button onClick={props.changeEditState}>discard</Button>
      <Button
        onClick={() => {
          updateQuestion(props.question.id);
          props.changeEditState();
        }}>
        save
      </Button>
    </Wrapper>
  );
};

export default Edit;

const Wrapper = styled.div`
  > h2 {
    ${tw`
      mb-2 mt-6
      font-extrabold text-2xl uppercase
    `}
  }

  > h3 {
    ${tw`
      mt-2 mb-1
      font-semibold text-lg
    `}
  }
`;

const Input = styled.input`
  ${tw`
    p-2 w-full m-0
    rounded-md shadow-sm border border-gray-300
    focus:outline-none focus:ring focus:ring-indigo-400
    placeholder-black text-black
  `}
`;

const Button = styled.button`
  ${tw`
    bg-indigo-600 rounded-md py-1 px-6 mt-4
    text-white
    focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-500
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
`;