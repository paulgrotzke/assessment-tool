import React, { useState } from 'react';
import AuthCheck from '../../Components/AuthCheck';
import { firestore } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import * as t from './types';
import useResults from '../Survey/Hooks/useResults';

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

  const ref = firestore.collection('questions');
  const [data] = useCollection(ref);
  const questions: t.Question[] = [];
  data?.docs.map((doc: t.QuestionDocument) =>
    questions.push({
      id: doc.id,
      focusArea: doc.data().focusArea,
      digitalCapability: doc.data().digitalCapability,
      practiceItem: doc.data().practiceItem,
    }),
  );


  let amountEmployees: string[] = [];
  let companyPosition: string[] = [];
  let industryBelong: string[] = [];
  let comprehensiveness: number = 0;
  let consistency: number = 0;
  let problemAdequacy: number = 0;

  for (let m in generalQuestions) {
    amountEmployees.push(generalQuestions[m].amountEmployees);
    companyPosition.push(generalQuestions[m].companyPosition);
    industryBelong.push(generalQuestions[m].industryBelong);
    comprehensiveness =
      comprehensiveness + generalQuestions[m].comprehensiveness;
    consistency = consistency + generalQuestions[m].consistency;
    problemAdequacy =
      problemAdequacy + generalQuestions[m].problemAdequacy;
  }

  //use memo hook nutzen

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

  const areas = {};
  for (const question of questions) {
    const { focusArea, digitalCapability, practiceItem } = question;
    if (!areas[focusArea]) areas[focusArea] = {};
    if (!areas[focusArea][digitalCapability])
      areas[focusArea][digitalCapability] = {};
    areas[focusArea][digitalCapability][practiceItem] = 0;
  }
  const questionList = Object.keys(areas).map((key) => ({
    [key]: areas[key],
  }));

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
      {Object.entries(industryBelongValues).map(([key, value]) => (
        <li>
          {key}: {value}
        </li>
      ))}
      <b>
        <p># Participants by company size</p>
      </b>
      {Object.entries(amountEmployeesValues).map(([key, value]) => (
        <li>
          {key}: {value}
        </li>
      ))}
      <b>
        <p># Participants by position</p>
      </b>
      {Object.entries(companyPositionValues).map(([key, value]) => (
        <li>
          {key}: {value}
        </li>
      ))}
      <b>
        <p>Ø - Feedback</p>
      </b>
      <p>Ø - Comprehensiveness</p>
      <p>{comprehensiveness / surveys.length}</p>
      <p>Ø - Consistency</p>
      <p>{consistency / surveys.length}</p>
      <p>Ø - Problem adequacy</p>
      <p>{problemAdequacy / surveys.length}</p>
      <div>
        {questionList.map((question) => (
          <div>
            {Object.keys(question)}
            {Object.keys(question[Object.keys(question)[0]]).map(
              (capabilities) => (
                <li>
                  {capabilities}
                  {Object.keys(
                    question[Object.keys(question)[0]][capabilities],
                  ).map((practiceItem) => (
                    <li
                      style={{
                        marginLeft: 20,
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      {practiceItem}
                    </li>
                  ))}
                </li>
              ),
            )}
          </div>
        ))}
      </div>
    </AuthCheck>
  );
};

export default Statistics;
