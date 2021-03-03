import { useMemo, useState } from 'react';
import tw, { styled } from 'twin.macro';
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
  const [statistics, setStatistics]: any = useState([]);

  useMemo(async () => {
    const surveyList: t.SurveyList[] = [];
    for (let docId of docs) {
      const resultsRef = firestore
        .collection('surveys')
        .doc(docId)
        .collection('answers');
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

    // console.log(Object.keys(areas).length);

    let test = {};
    for (let key in areas) {
      test = {
        ...test,
        [key]: (Object.keys(areas[key]).length)
      }
    }

    console.log(areas)

    // Focus3 > Capability1 = (21/ props.surveys.surveyData.length + 15 /  props.surveys.surveyData.length + 24 /  props.surveys.surveyData.length)


    setStatistics(
      Object.keys(areas).map((key) => ({
        [key]: areas[key],
      })),
    );
  }, [docs]);

  return (
    <Wrapper>
      <h2>Question Statistics</h2>
      <div className="result">
        <div className="criteria">Ø - digital Score</div>
        <div className="points">todo</div>
      </div>
      {statistics.map((question, i) => (
        <FocusArea>
          <h3>{Object.keys(question)}</h3>
          {Object.keys(question[Object.keys(question)[0]]).map(
            (capabilities, i) => (
              <div className="capa-wrapper">
                <p className="capabilities">{capabilities}</p>
                {Object.keys(
                  question[Object.keys(question)[0]][capabilities],
                ).map((practiceItem, i) => (
                  <div className="result">
                    <div className="practiceItem">{practiceItem} </div>
                    <div className="points">
                      {
                        question[Object.keys(question)[0]][capabilities][
                          practiceItem
                        ] / props.surveys.surveyData.length
                      }
                    </div>
                  </div>
                ))}
              </div>
            ),
          )}
        </FocusArea>
      ))}
    </Wrapper>
  );
};

export default QuestionStatistics;

const Wrapper = styled.div`
  > h2 {
    ${tw`
      mb-6 mt-6
      font-extrabold text-2xl uppercase
    `}
  }
`;

const FocusArea = styled.div`
  ${tw`
     rounded-md shadow-2xl mt-6 bg-gray-100 mb-6
    `}

  > h3 {
    ${tw`
      px-4 py-2
      mt-2 mb-1
      font-semibold text-xl text-white
      bg-indigo-600 rounded-sm
    `}
  }

  > .capa-wrapper {
    ${tw`
     px-4 py-2
    `}

    > .capabilities {
      ${tw`
      font-semibold text-lg
      
    `}
    }

    > .result {
      ${tw`
        grid grid-cols-5 py-1
      `}

      > .practiceItem {
        ${tw`
        col-span-4
        `}
      }

      > .points {
        ${tw`
        text-right font-semibold
        `}
      }
    }
  }
`;
