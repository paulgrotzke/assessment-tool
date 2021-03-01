import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { firestore } from '../../lib/firebase';
import useQuestions from '../Hooks/useQuestions';
import AuthCheck from '../../Components/AuthCheck';
import Delete from './Components/Delete';
import Edit from './Components/Edit';
import useSurveys from './Hooks/useSurveys';
import GeneralStatistics from './Components/GeneralStatistics';
import QuestionStatistics from './Components/QuestionStatistics';

const Controllcenter = () => {
  const questions = useQuestions();
  const surveys = useSurveys();

  const [focusArea, setFocusArea] = useState('');
  const [digitalCapability, setDigitalCapability] = useState('');
  const [practiceItem, setPracticeItem] = useState('');
  const [edit, setEdit] = useState(false);

  const [showQuestionStatistics, setShowQuestionStatistics] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState(false);

  const changeEditState = () => {
    setEdit(!edit);
  };

  const postQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newQuestionRef = firestore.collection('questions').doc();

    const data = {
      focusArea: focusArea,
      digitalCapability: digitalCapability,
      practiceItem: practiceItem,
    };
    await newQuestionRef.set(data);
  };

  if (showConfiguration) {
    <QuestionStatistics surveys={surveys} />;
  }

  if (showConfiguration) {
    return (
      <AuthCheck role="admin">
        <Wrapper>
          <h2>Digify - Controll Center</h2>
          <p>Here you can add/edit/delete assessment question and view statistics</p>
          <Button>Edit assessment</Button>
          <Button>View Statistics</Button>
          <Button>Link</Button>
          <h3>Focus area</h3>
          <Input
            placeholder="Insert focus area"
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value)}></Input>
          <h3>Digital Capability</h3>
          <Input
            placeholder="Insert digital capability"
            value={digitalCapability}
            onChange={(e) => setDigitalCapability(e.target.value)}></Input>
          <h3>Practice Item</h3>
          <Input
            placeholder="Insert practice item"
            value={practiceItem}
            onChange={(e) => setPracticeItem(e.target.value)}
            onClick={() => postQuestion}></Input>
          <Button>Create</Button>
          <h3>Current Questions</h3>
          {questions?.map((question, i) => (
            <FocusArea>
              <h3>{question.focusArea}</h3>
              <li>{question.digitalCapability}</li>
              <li>{question.practiceItem}</li>
              <Delete question={question} />
              <p onClick={() => setEdit(true)}>Edit</p>
              {edit && <Edit question={question} changeEditState={changeEditState} />}
            </FocusArea>
          ))}
        </Wrapper>
      </AuthCheck>
    );
  }
  return (
    <AuthCheck role="admin">
      <Wrapper>
        <GeneralStatistics surveys={surveys} />
      </Wrapper>
    </AuthCheck>
  );
};

export default Controllcenter;

const Wrapper = styled.div`
  ${tw`
    max-w-xl bg-white px-10 py-6 rounded-md shadow-2xl
  `}

  > h2 {
    ${tw`
      mb-6
      pt-8
      font-extrabold text-2xl uppercase
    `}
  }

  > h3 {
    ${tw`
      mt-4
      mb-1
      font-semibold text-lg
    `}
  }
`;

const Select = styled.select`
  ${tw`
    p-2 w-full m-0
    rounded-md shadow-sm border border-gray-300
    focus:outline-none focus:ring focus:ring-indigo-400
  `}
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

  > h3 {
    ${tw`
      mt-2 mb-1
      font-semibold text-xl text-indigo-600
    `}
  }
`;
