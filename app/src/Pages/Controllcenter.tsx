import React, { useEffect, useState, createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Edit from '../Components/Edit';
import { auth, firestore } from '../lib/firebase';

type Document = {
  id: string;
  data: () => Question;
};

type Question = {
  id: string;
  focusArea: string;
  digital: string;
  practiceItem: string;
};

const Controllcenter = () => {
  const [admin, error] = useAuthState(auth);

  const [password, setPassword] = useState('');
  const [focusArea, setFocusArea] = useState('');
  const [digital, setDigitalCapability] = useState('');
  const [practiceItem, setPracticeItem] = useState('');
  const [edit, setEdit] = useState(false);

  const [question1, setQuestion1] = useState();

  const changeEditState = () => {
    setEdit(!edit);
  };

  const login = () => {
    auth.signInWithEmailAndPassword('admin@user.de', password);
  };

  const ref = firestore.collection('questions');
  const [data] = useCollection(ref);
  const questions: Question[] = [];
  data?.docs.map((doc: Document) =>
    questions.push({
      id: doc.id,
      focusArea: doc.data().focusArea,
      digital: doc.data().digital,
      practiceItem: doc.data().practiceItem,
    }),
  );

  const getQuestions = async () => {
    const questionDocumentList = await firestore
      .collection('questions')
      .get();
    const test: Question[] = [];
    questionDocumentList.docs.map((doc) =>
      test.push({
        id: doc.id,
        focusArea: doc.data().focusArea,
        digital: doc.data().digital,
        practiceItem: doc.data().practiceItem,
      }),
    );
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const postQuestion = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const newQuestionRef = firestore.collection('questions').doc();

    const data = {
      focusArea: focusArea,
      digital: digital,
      practiceItem: practiceItem,
    };
    await newQuestionRef.set(data);
  };

  const deleteQuestion = async (questionId: Question['id']) => {
    await firestore.collection('questions').doc(questionId).delete();
  };

  if (admin) {
    return (
      <div>
        <h1>Digify - Controll Center</h1>
        <p>
          Here you cann add/edit/delte assessment question and view
          statistics
        </p>
        <form onSubmit={postQuestion}>
          <p>Focus area:</p>
          <input
            placeholder="Insert focus area"
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value)}></input>
          <p>Digital Capability:</p>
          <input
            placeholder="Insert digital capability"
            value={digital}
            onChange={(e) =>
              setDigitalCapability(e.target.value)
            }></input>
          <p>Practice Item</p>
          <input
            placeholder="Insert practice item"
            value={practiceItem}
            onChange={(e) => setPracticeItem(e.target.value)}></input>
          <button>Create</button>
        </form>
        <p>Current Questions:</p>
        {questions?.map((question, i) => (
          <div>
            <ul key={i}>
              <li>{question.focusArea}</li>
              <li>{question.digital}</li>
              <li>{question.practiceItem}</li>
            </ul>
            <p onClick={() => deleteQuestion(question.id)}>Delete</p>
            <p onClick={() => setEdit(true)}>Edit</p>
            {edit && (
              <Edit  changeEditState={changeEditState} />
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}></input>
        <button onClick={login}>Login</button>
      </div>
    );
  }
};

export default Controllcenter;
