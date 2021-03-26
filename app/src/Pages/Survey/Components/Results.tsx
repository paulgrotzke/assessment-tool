import tw, { styled, css } from 'twin.macro'
import useResults from '../hooks/useResults'

const Results = () => {
  const results = useResults()

  const areas = {}
  let capabilityScoring = {}
  let capabilityLength = {}

  for (const result of results) {
    const {
      answerValue,
      focusArea,
      digitalCapability,
      practiceItem,
      maturityStage,
    } = result
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
    areas[focusArea][digitalCapability][practiceItem] = [answerValue, maturityStage]
    capabilityScoring[focusArea][digitalCapability] += answerValue
    capabilityLength[focusArea][digitalCapability] += 1
  }
  const resultList = Object.keys(areas).map((key) => ({
    [key]: areas[key],
  }))

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

  finalScoring = finalScoring / Object.keys(scoring).length

  return (
    <Wrapper>
      <div className="no-print">
        <h2>Your individual evaluation!</h2>
        <p>Congratulations you have reached a total digital score of</p>
        <p className="result">{finalScoring.toFixed(2)} Points</p>
        <p>In general results can range from:</p>
        <p>
          <b>0.00</b> - traditional non-digital incumbent
        </p>
        <p>to</p>
        <p>
          <b>4.00</b> - digital enterprise
        </p>
        <p className="text">
          In the following you can see your digital score for each capability
          area as well as for each digital capability. Furthermore you get your
          rating for each actionable practice item. On top of that you get a
          recommendation for which actionable practice you should implement
          next. In general we recommend to implement the actionable practices
          stage by stage: Novice, Advanced Beginner, Competent, Proficient,
          Expert. (the stage of each practice is noted). Of course that´s only a
          recommendation and you can adapt the implementation plan for the
          practices to your specific needs.
        </p>
        <p>Best of success with the digital transformation of your company!</p>
      </div>
      <div className="progress">
        {resultList.map((result) => {
          return (
            <div className="progress-outer">
              <div className="progress-tag">{Object.keys(result)}</div>
              <div
                className="progress-bar"
                style={{
                  width: `${
                    (scoring[Object.keys(result)[0]].toFixed(2) / 4) * 100
                  }%`,
                }}
              >
                {scoring[Object.keys(result)[0]].toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
      <div className="progress">
        <div className="progress-outer">
          <div className="progress-tag" tw="font-semibold">
            Your digital Score
          </div>
          <div
            className="progress-bar"
            style={{
              //@ts-ignore
              width: `${(finalScoring.toFixed(2) / 4) * 100}%`,
            }}
          >
            {finalScoring.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="progress-scale">
        <div tw="text-right font-semibold"></div>
        <div className="scale">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </div>
      </div>
      <div className="printable">
        {resultList.map((result) => {
          return (
            <FocusArea>
              <div className="header">
                <p className="focusArea">{Object.keys(result)}</p>
                <p className="scoring">
                  {scoring[Object.keys(result)[0]].toFixed(2)}
                </p>
              </div>
              {Object.keys(result[Object.keys(result)[0]]).map(
                (capabilities) => {
                  return (
                    <div className="capa-wrapper">
                      <div className="capa-scoring">
                        <p className="capabilities">{capabilities}</p>
                        <p className="scoring">
                          {subScoring[Object.keys(result)[0]][
                            capabilities
                          ].toFixed(2)}
                        </p>
                      </div>
                      {Object.entries(
                        result[Object.keys(result)[0]][capabilities]
                      ).map((practiceItem) => (
                        <div className="result">
                          <div className="practiceItem">
                            {practiceItem[0] + ' '}
                            {/* @ts-ignore */}
                            <p tw="italic">Maturity Stage: {practiceItem[1][1]}</p>
                          </div>
                          <div className="points">
                            {/* @ts-ignore */}
                            {practiceItem[1][0] + ' P.'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                }
              )}
            </FocusArea>
          )
        })}
      </div>
      <div className="no-print">
        <p className="print-hint">
          You can
          <span onClick={() => window.print()}> save</span> your results if you
          want to.
        </p>
      </div>
    </Wrapper>
  )
}

export default Results

const Wrapper = styled.div`
  ${tw`
    block
  `}

  > .no-print {
    > h2 {
      ${tw`
      my-6
      text-3xl uppercase 
    `}
    }
    > p {
      > span {
        ${tw`
      font-light cursor-pointer text-indigo-600 hover:text-indigo-500
    `}
      }
    }
    > .result {
      ${tw`
        my-2
        font-light text-indigo-600 text-xl
      `}
    }

    > .text {
      ${tw`
        mt-2
      `}
    }

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

  > .progress {
    > .progress-outer {
      ${tw`
      shadow w-full lg:w-10/12 bg-gray-200 rounded-sm
      my-3
      grid grid-cols-2
    `}

      > .progress-tag {
        ${tw`
      text-right
      bg-white
      pr-4
      py-1
    `}
      }

      > .progress-bar {
        ${tw`
      bg-gradient-to-r from-indigo-500 to-indigo-400
      text-xs leading-none py-1 text-center text-black font-semibold
      rounded-sm
      py-2
    `}
      }
    }
  }

  > .progress-scale {
    ${tw`
      w-full lg:w-10/12
      grid grid-cols-2
      mb-10
    `}

    > .scale {
      ${tw`
      grid grid-cols-4
      text-right
    `}
    }
  }

  @media print {
    width: auto;
    height: auto;
    overflow: visible;
    .no-print {
      display: none;
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
        font-medium
        `}
      }
    }
  }
`
