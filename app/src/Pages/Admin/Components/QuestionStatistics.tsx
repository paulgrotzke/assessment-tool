import { useState } from 'react';
import { firestore } from '../../../lib/firebase';
import * as t from '../types';

type Props = {
  surveys: {
    surveyData: t.GeneralQuestions[];
    docs: string[];
  };
};

const QuestionStatistics = (props: Props) => {
  const docs = props.surveys.docs;
  const surveyList: t.SurveyList[] = [];
  const [statistics, setStatistics]: any = useState([]);

  const getStatistics = async () => {
    for (let docId of docs) {
      const resultsRef = firestore.collection('surveys').doc(docId).collection('answers');
      await resultsRef.get().then((result) => {
        result.docs.map((doc: any) =>
          surveyList.push({
            answerValue: doc.data().answerValue,
            digitalCapability: doc.data().digitalCapability,
            focusArea: doc.data().focusArea,
            practiceItem: doc.data().practiceItem,
          }),
        );
      });
    }

    const areas = {};
    for (const entry of surveyList) {
      const { answerValue, focusArea, digitalCapability, practiceItem } = entry;
      if (!areas[focusArea]) {
        areas[focusArea] = {};
      }
      if (!areas[focusArea][digitalCapability]) {
        areas[focusArea][digitalCapability] = {};
      }
      if (Object.keys(areas[focusArea][digitalCapability]).length !== 0) {
        let indicator;
        for (let key of Object.keys(areas[focusArea][digitalCapability])) {
          if (key === practiceItem) {
            areas[focusArea][digitalCapability][practiceItem] += answerValue;
            indicator = true;
          }
        }
        if (!indicator) {
          areas[focusArea][digitalCapability][practiceItem] = answerValue;
        }
      } else {
        areas[focusArea][digitalCapability][practiceItem] = answerValue;
      }
    }
    setStatistics(
      Object.keys(areas).map((key) => ({
        [key]: areas[key],
      })),
    );
    console.log(statistics);
  };

  return (
    <div>
      {statistics.map((question) => (
        <div>
          {console.log(question)}
          {Object.keys(question)}
          {Object.keys(question[Object.keys(question)[0]]).map((capabilities) => (
            <li>
              {capabilities}
              {Object.keys(question[Object.keys(question)[0]][capabilities]).map(
                (practiceItem) => (
                  <li
                    style={{
                      marginLeft: 20,
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    {practiceItem}:{' '}
                    {question[Object.keys(question)[0]][capabilities][practiceItem]}
                  </li>
                ),
              )}
            </li>
          ))}
        </div>
      ))}
      <p
        onClick={() => {
          getStatistics();
        }}>
        getStatistics
      </p>
    </div>
  );
};

export default QuestionStatistics;
