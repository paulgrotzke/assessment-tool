import React, { useEffect, useState } from 'react';
import AuthCheck from '../../Components/AuthCheck';
import { firestore } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import * as t from './types';

const Statistics = () => {
  const surveyRef = firestore.collection('answers');
  const [surveyData] = useCollection(surveyRef);
  const [currentSurvey, setCurrentSurvey] = useState(-1);

  const surveys: t.Survey[] = [];
  surveyData?.docs.forEach((doc: t.Document) => {
    surveys.push(doc.data());
  });

  const test = [];
  surveys.map((survey) => {});

  // for (let m in surveys[0]) {
  //   console.log(surveys[0][m]);
  // }

  // console.log(Object.keys(surveys[0]));

  // console.log(surveys[0]);

  // for (let m in surveys[0]) {
  //   console.log(surveys[0][m]);
  // }

  const getIndividualSurvey = (i: number) => {
    const survey = surveys[i];
    let answers = [];
    for (let m in survey) {
      //@ts-ignore
      if (typeof survey[m] === 'object') console.log(survey[m]);
    }
  };

  if (currentSurvey !== -1) {
    return (
      <AuthCheck role="admin">
        <div>
          <button onClick={() => setCurrentSurvey(-1)}>Close</button>
        </div>
      </AuthCheck>
    );
  }

  return (
    <AuthCheck role="admin">
      <h1> General Statistics</h1>
      <p>Ø - digital Score</p>
      <p>todo</p>
      <p># Participants</p>
      <p>{surveys.length}</p>
      <b>
        <p># Participants by industry</p>
      </b>
      <p>todo</p>
      <b>
        <p># Participants by company size</p>
      </b>
      <p>todo</p>
      <b>
        <p># Participants by position</p>
      </b>
      <p>todo</p>
      <b>
        <p>Ø - Feedback</p>
      </b>
      <p>Ø - Comprehensiveness</p>
      <p>todo</p>
      <p>Ø - Consistency</p>
      <p>todo</p>
      <p>Ø - Problem adequacy</p>
      <p>todo</p>
    </AuthCheck>
  );
};

export default Statistics;
