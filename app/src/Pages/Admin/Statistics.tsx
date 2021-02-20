import React, { useState } from 'react';
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

  let amountEmployees: string[] = [];
  let companyPosition: string[] = [];
  let industryBelong: string[] = [];

  for (let m in generalQuestions) {
    amountEmployees.push(generalQuestions[m].amountEmployees);
    companyPosition.push(generalQuestions[m].companyPosition);
    industryBelong.push(generalQuestions[m].industryBelong);
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

  let questionList = [];
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
  console.log(questions);

  for (let m in questions) {
    if (
      Object.keys(questionList).length === 0 &&
      questions.length !== 0
    ) {
      //@ts-ignore
      questionList.push({
        [questions[m]['focusArea']]: {
          [questions[m]['digitalCapability']]: {
            [questions[m]['practiceItem']]: 0,
          },
        },
      });
      //@ts-ignore
      questionList.push({
        [questions[m]['focusArea']]: {
          [questions[m]['digitalCapability']]: {
            [questions[m]['practiceItem']]: 0,
          },
        },
      });
    }
    for (let n in questionList) {
      if (
        questions[m].focusArea === Object.keys(questionList[n])[m]
      ) {
        if (
          questions[m].digitalCapability ===
          Object.keys(
            questionList[n][Object.keys(questionList[n])[m]],
          )[m]
        ) {
          console.log(questionList)
          console.log(Object.keys(questionList))
          //@ts-ignore
          // questionList.push({
          //   ...questionList,
          //   [Object.keys(questionList)[m]]: {
          //     [Object.keys(questionList[n])[m]]: {
          //       [questions[m]['practiceItem']]: 0,
          //     },
          //   },
          // });
        }
        // questionList = {
        //   ...questionList,
        //   [Object.keys(questionList)[m]]: {
        //     ...Object.keys(questionList[n]),
        //     [questions[m]['digitalCapability']]: {
        //       [questions[m]['practiceItem']]:
        //         questions[m]['practiceItem'],
        //     },
        //   },
        // };
      }
      // questionList = {
      //   ...questionList,
      //   [questions[m]['focusArea']]: {
      //     [questions[m]['digitalCapability']]: {
      //       [questions[m]['practiceItem']]: 0,
      //     },
      //   },
      // };
    }
  }

  // for (let m in questions) {
  //   if (
  //     Object.keys(questionList).length === 0 &&
  //     questions.length !== 0
  //   ) {
  //     //@ts-ignore
  //     questionList.push({
  //       [questions[m]['focusArea']]: {
  //         [questions[m]['digitalCapability']]: {
  //           [questions[m]['practiceItem']]: 0,
  //         },
  //       },
  //     })
  //   }
  //   for (let n in questionList) {
  //     if (questions[m].focusArea === Object.keys(questionList)[m]) {
  //       if (
  //         questions[m].digitalCapability ===
  //         Object.keys(questionList[n])[m]
  //       ) {
  //         questionList = {
  //           ...questionList,
  //           [Object.keys(questionList)[m]]: {
  //             [Object.keys(questionList[n])[m]]: {
  //               [questions[m]['practiceItem']]: 0,
  //             },
  //           },
  //         };
  //       }
  //       questionList = {
  //         ...questionList,
  //         [Object.keys(questionList)[m]]: {
  //           ...Object.keys(questionList[n]),
  //           [questions[m]['digitalCapability']]: {
  //             [questions[m]['practiceItem']]:
  //               questions[m]['practiceItem'],
  //           },
  //         },
  //       };
  //     }
  //     questionList = {
  //       ...questionList,
  //       [questions[m]['focusArea']]: {
  //         [questions[m]['digitalCapability']]: {
  //           [questions[m]['practiceItem']]: 0,
  //         },
  //       },
  //     };
  //   }
  // }

  console.log(questionList);

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
      <p>todo</p>
      <p>Ø - Consistency</p>
      <p>todo</p>
      <p>Ø - Problem adequacy</p>
      <p>todo</p>
    </AuthCheck>
  );
};

export default Statistics;
