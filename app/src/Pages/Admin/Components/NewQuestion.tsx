import { useState } from 'react';
import { BsTrash, BsPencil } from 'react-icons/bs';
import tw, { styled } from 'twin.macro';
import { firestore } from '../../../lib/firebase';
import useQuestions from '../../Hooks/useQuestions';
import Edit from './Edit';

type Props = {
  focusArea: string;
  setFocusArea: (bostringol: string) => void;
  digitalCapability: string;
  setDigitalCapability: (string: string) => void;
  practiceItem: string;
  setPracticeItem: (string: string) => void;
};

const NewQuestion = (props: Props) => {
  const questions = useQuestions();
  const [edit, setEdit] = useState(0);

  const postQuestion = async () => {
    const newQuestionRef = firestore.collection('questions').doc();

    const data = {
      focusArea: props.focusArea,
      digitalCapability: props.digitalCapability,
      practiceItem: props.practiceItem,
    };
    await newQuestionRef.set(data);
  };

  const deleteQuestion = async (questionId) => {
    const confirm = window.confirm(
      'Are you sure to delete? All answers for this questions will be deleted too.',
    );
    if (confirm) {
      await firestore.collection('questions').doc(questionId).delete();
    }
  };

  return (
    <Wrapper>
      <h2>Add new questions</h2>
      <h3>Focus area</h3>
      <Input
        placeholder="Insert focus area"
        value={props.focusArea}
        onChange={(e) => props.setFocusArea(e.target.value)}></Input>
      <h3>Digital Capability</h3>
      <Input
        placeholder="Insert digital capability"
        value={props.digitalCapability}
        onChange={(e) => props.setDigitalCapability(e.target.value)}></Input>
      <h3>Practice Item</h3>
      <Input
        placeholder="Insert practice item"
        value={props.practiceItem}
        onChange={(e) => props.setPracticeItem(e.target.value)}></Input>
      <Button onClick={() => postQuestion()}>Create</Button>
      <h2>Config current Questions</h2>
      {questions?.map((question, i) => (
        <FocusArea>
          <div className="header">
            <h3>{question.focusArea}</h3>
            <BsPencil
              onClick={() => {
                setEdit(i + 1);
              }}
            />
            <BsTrash onClick={() => deleteQuestion(question.id)} />
          </div>
          <div>{question.digitalCapability}</div>
          <div>{question.practiceItem}</div>
          {edit === i + 1 && <Edit question={question} setEdit={setEdit} />}
        </FocusArea>
      ))}
    </Wrapper>
  );
};

export default NewQuestion;

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
    bg-indigo-600 rounded-md py-2 px-6 mt-4
    text-white
    focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-500
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
`;

const FocusArea = styled.div`
  ${tw`
     rounded-md shadow-xl p-4 mt-6 bg-gray-100 mb-6
    `}

  > .header {
    ${tw`grid grid-cols-12`}

    > h3 {
      ${tw`
      mb-1 col-span-10
      font-semibold text-xl
    `}
    }
  }
`;