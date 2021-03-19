import tw, { styled } from 'twin.macro'
import useResults from '../hooks/useResults'

const Results = () => {
  const results = useResults()

  const areas = {}
  let capabilityScoring = {}
  let capabilityLength = {}

  for (const result of results) {
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
        <h2>Great!</h2>
        <p>You have successfully passed the assessment.</p>
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
                          </div>
                          <div className="points">
                            {practiceItem[1] + ' P.'}
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

  @media print {
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
