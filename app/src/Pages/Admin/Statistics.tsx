import React, { useEffect, useState } from 'react';
import AuthCheck from '../../Components/AuthCheck';
import { firestore } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import * as t from './types';

const Statistics = () => {
  const surveyRef = firestore.collection('surveys');
  const [surveyData] = useCollection(surveyRef);
  const [currentSurvey, setCurrentSurvey] = useState(-1);

  const surveys: t.Survey[] = [];
  surveyData?.docs.forEach((doc: t.Document) => {
    surveys.push(doc.data());
  });

  const generealQuestionsRef = firestore.collection('surveys');
  const [generalQuestionsData] = useCollection(generealQuestionsRef);
  const generalQuestions: t.GeneralQuestions[] = [];
  generalQuestionsData?.docs.forEach(
    (doc: t.GeneralQuestionsDocument) => {
      generalQuestions.push(doc.data());
    },
  );

  // let amountEmployees: {
  //   low: (string | number)[];
  //   middle: (string | number)[];
  //   high: (string | number)[];
  // } = {
  //   low: [],
  //   middle: [],
  //   high: [],
  // };
  let amountEmployees: string[] = [];
  let companyPosition: string[] = [];
  let industryBelong: string[] = [];

  for (let m in generalQuestions) {
    amountEmployees.push(generalQuestions[m].amountEmployees);
    companyPosition.push(generalQuestions[m].companyPosition);
    industryBelong.push(generalQuestions[m].industryBelong);
    // if (generalQuestions[m].amountEmployees === '1-249') {
    //   amountEmployees = {
    //     ...amountEmployees,
    //     low: [
    //       ...amountEmployees.low,
    //       amountEmployees.low.push(
    //         generalQuestions[m].amountEmployees,
    //       ),
    //     ],
    //   };
    // }
    // if (generalQuestions[m].amountEmployees === '250-999') {
    //   amountEmployees = {
    //     ...amountEmployees,
    //     middle: [
    //       ...amountEmployees.middle,
    //       amountEmployees.middle.push(
    //         generalQuestions[m].amountEmployees,
    //       ),
    //     ],
    //   };
    // }
    // if (generalQuestions[m].amountEmployees === '>1000') {
    //   amountEmployees = {
    //     ...amountEmployees,
    //     high: [
    //       ...amountEmployees.high,
    //       amountEmployees.high.push(
    //         generalQuestions[m].amountEmployees,
    //       ),
    //     ],
    //   };
    // }
  }

  const companyPositionValues = {};
  for (let i = 0; i < companyPosition.length; i++) {
    if (!companyPositionValues[companyPosition[i]])
      companyPositionValues[companyPosition[i]] = 0;
    ++companyPositionValues[companyPosition[i]];
  }

  const industryBelongValues = {};
  for (let i = 0; i < industryBelong.length; i++) {
    if (!industryBelongValues[industryBelong[i]])
      industryBelongValues[industryBelong[i]] = 0;
    ++industryBelongValues[industryBelong[i]];
  }

  const amountEmployeesValues = {};
  for (let i = 0; i < amountEmployees.length; i++) {
    if (!amountEmployeesValues[amountEmployees[i]])
      amountEmployeesValues[amountEmployees[i]] = 0;
    ++amountEmployeesValues[amountEmployees[i]];
  }

  console.log(amountEmployeesValues);
  console.log(industryBelongValues);
  console.log(companyPositionValues);

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
      <li>1-249: </li>
      <li>250-999: </li>
      <li>greater 1000:</li>
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
