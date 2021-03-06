import { useMemo, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { firestore } from '../../../lib/firebase'
import * as t from '../types'

type Props = {
  surveys: {
    surveyData: t.GeneralQuestions[]
    docs: string[]
  }
}

const QuestionStatistics = (props: Props) => {
  const docs = props.surveys.docs
  const [statistics, setStatistics]: any = useState([])
  const [scoring, setScoring] = useState(0)
  const [capaScoring, setCapaScoring] = useState({})
  const [focusScoring, setFocusScoring] = useState({})

  useMemo(async () => {
    const surveyList: t.SurveyList[] = []
    for (let docId of docs) {
      const resultsRef = firestore
        .collection('surveys')
        .doc(docId)
        .collection('answers')
      await resultsRef.get().then((result) => {
        result.docs.map((doc: any) =>
          surveyList.push({
            answerValue: doc.data().answerValue,
            digitalCapability: doc.data().digitalCapability,
            focusArea: doc.data().focusArea,
            practiceItem: doc.data().practiceItem,
            maturityStage: doc.data().maturityStage,
            listing: doc.data().value,
          })
        )
      })
    }

    if (surveyList.length !== 0) {
      for (let i = 0; i < surveyList.length; i++) {
        for (let j = 0; j + 1 < surveyList.length; j++) {
          if (surveyList[j]['listing'] > surveyList[j + 1]['listing']) {
            let tmp = surveyList[j]
            surveyList[j] = surveyList[j + 1]
            surveyList[j + 1] = tmp
          }
        }
      }
    }

    const areas = {}
    let capabilityScoring = {}
    let capabilityLength = {}

    const test = {}
    for (const entry of surveyList) {
      const {
        answerValue,
        focusArea,
        digitalCapability,
        practiceItem,
        maturityStage,
      } = entry
      if (!test[focusArea]) {
        test[focusArea] = {}
      }
      if (!test[focusArea][digitalCapability]) {
        test[focusArea][digitalCapability] = {}
      }
      if (Object.keys(test[focusArea][digitalCapability]).length !== 0) {
        let indicator
        for (let key of Object.keys(test[focusArea][digitalCapability])) {
          if (key === practiceItem) {
            test[focusArea][digitalCapability][practiceItem][0] += answerValue
            indicator = true
          }
        }
        if (!indicator) {
          test[focusArea][digitalCapability][practiceItem] = [
            answerValue,
            maturityStage,
          ]
        }
      } else {
        test[focusArea][digitalCapability][practiceItem] = [
          answerValue,
          maturityStage,
        ]
      }
    }

    setStatistics(
      Object.keys(test).map((key) => ({
        [key]: test[key],
      }))
    )

    for (const result of surveyList) {
      const { answerValue, focusArea, digitalCapability, practiceItem } = result
      if (!areas[focusArea]) {
        areas[focusArea] = {}
        capabilityScoring[focusArea] = {}
        capabilityLength[focusArea] = {}
      }
      if (!areas[focusArea][digitalCapability]) {
        areas[focusArea][digitalCapability] = {}
        capabilityScoring[focusArea][digitalCapability] = 0
        capabilityLength[focusArea][digitalCapability] = 0
      }
      areas[focusArea][digitalCapability][practiceItem] = answerValue
      capabilityScoring[focusArea][digitalCapability] += answerValue
      capabilityLength[focusArea][digitalCapability] += 1
    }

    let subScoring = {}
    let scoring = {}
    let finalScoring = 0
    for (let focusArea in capabilityScoring) {
      for (let capability in capabilityScoring[focusArea]) {
        subScoring = {
          ...subScoring,
          [focusArea]: {
            ...subScoring[focusArea],
            [capability]:
              capabilityScoring[focusArea][capability] /
              capabilityLength[focusArea][capability],
          },
        }
      }
      scoring = {
        ...scoring,
        [focusArea]: 0,
      }
      for (let key in subScoring[focusArea]) {
        scoring = {
          ...scoring,
          [focusArea]: scoring[focusArea] + subScoring[focusArea][key],
        }
      }
      scoring = {
        ...scoring,
        [focusArea]:
          scoring[focusArea] / Object.keys(subScoring[focusArea]).length,
      }
    }
    for (let key in scoring) {
      finalScoring = finalScoring + scoring[key]
    }

    setCapaScoring(subScoring)
    setFocusScoring(scoring)

    finalScoring = finalScoring / Object.keys(scoring).length
    setScoring(finalScoring)
  }, [docs])

  if (scoring !== 0) {
    return (
      <Wrapper>
        <div className="header">
          <h2>Question Statistics</h2>
          <div className="head">
            <div className="criteria">Ø - digital Score</div>
            <div className="points">{scoring.toFixed(2)}</div>
          </div>
        </div>
        {statistics.map((result) => {
          return (
            <FocusArea>
              <div className="header">
                <p className="focusArea">{Object.keys(result)}</p>
                <p className="scoring">
                  {focusScoring[Object.keys(result)[0]].toFixed(2)}
                </p>
              </div>
              {Object.keys(result[Object.keys(result)[0]]).map(
                (capabilities) => {
                  return (
                    <div className="capa-wrapper">
                      <div className="capa-scoring">
                        <p className="capabilities">{capabilities}</p>
                        <p className="scoring">
                          {capaScoring[Object.keys(result)[0]][
                            capabilities
                          ].toFixed(2)}
                        </p>
                      </div>
                      {Object.entries(
                        result[Object.keys(result)[0]][capabilities]
                      ).map((practiceItem) => {
                        return (
                          <div className="result">
                            <div className="practiceItem">
                              {practiceItem[0] + ' '}
                              {/* @ts-ignore */}
                              <p tw="italic">
                                {/* @ts-ignore */}
                                Maturity Stage: {practiceItem[1][1]}
                              </p>
                            </div>
                            <div className="points">
                              {/* @ts-ignore */}
                              {(practiceItem[1][0] / docs.length).toFixed(2) +
                                ' P.'}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )
                }
              )}
            </FocusArea>
          )
        })}
      </Wrapper>
    )
  }

  return <></>
}

export default QuestionStatistics

const Wrapper = styled.div`
  > .header {
    ${tw`
      
    `}
    > h2 {
      ${tw`
      my-6
      font-light text-3xl uppercase 
    `}
    }
    > .head {
      ${tw`
      font-semibold text-lg uppercase 
    `}
    }
  }
`

const FocusArea = styled.div`
  ${tw`
    my-6 
    rounded-md shadow-2xl bg-gray-100
  `}

  > h3 {
    ${tw`
      px-4 py-2 mt-2 mb-1
      font-medium text-xl text-white 
      bg-indigo-600 rounded-sm
    `}
  }

  > .header {
    ${tw`
      flex
      px-4 py-2 mt-2 mb-1
      bg-indigo-600 rounded-sm
    `}

    > .focusArea {
      ${tw`
      flex-1
      font-medium text-xl text-white 
      `}
    }

    > .scoring {
      ${tw`
      flex-1
      font-medium text-xl text-white text-right
      `}
    }
  }

  > .capa-wrapper {
    ${tw`
     px-4 py-2
    `}

    > .capa-scoring {
      ${tw`
          flex
      `}

      > .capabilities {
        ${tw`
          flex-1
          font-medium text-lg
        `}
      }

      > .scoring {
        ${tw`
          flex-1
          font-medium text-lg text-right
        `}
      }
    }

    > .result {
      ${tw`
        grid grid-cols-5 
        py-1
      `}

      > .practiceItem {
        ${tw`
        col-span-4
        `}
      }

      > .points {
        ${tw`
        text-right
        `}
      }
    }
  }
`
