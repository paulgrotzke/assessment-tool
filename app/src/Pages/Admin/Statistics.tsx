import React from 'react';
import AuthCheck from '../../Components/AuthCheck';
import { firestore } from '../../lib/firebase';
import {
  useCollection,
  useDocument,
} from 'react-firebase-hooks/firestore';
import * as t from './types';

const Statistics = () => {
  const surveyRef = firestore.collection('answers');
  const [surveyData] = useCollection(surveyRef);

  const surveys: string[] = [];
  surveyData?.docs.forEach((doc: t.Document) => {
    //@ts-ignore
    surveys.push(doc.data());
  });

  const test = [];
  surveys.map((survey) => {});

  console.log(surveys);

  

  return (
    <AuthCheck role="admin">
      <h1>Statistics</h1>
    </AuthCheck>
  );
};

export default Statistics;
