import * as t from '../types'
import tw, { css, styled } from 'twin.macro'

type Props = {
  surveys: {
    surveyData: t.GeneralQuestions[]
    docs: string[]
  }
}

const GeneralStatistics = (props: Props) => {
  const surveyList = props.surveys.surveyData

  let amountEmployees: string[] = []
  let companyPosition: string[] = []
  let industryBelong: string[] = []
  let comprehensiveness: number = 0
  let consistency: number = 0
  let problemAdequacy: number = 0
  const companyPositionValues = {}
  const industryBelongValues = {}
  const amountEmployeesValues = {}

  for (let i in surveyList) {
    amountEmployees.push(surveyList[i].amountEmployees)
    companyPosition.push(surveyList[i].companyPosition)
    industryBelong.push(surveyList[i].industryBelong)
    if (surveyList[i].comprehensiveness !== undefined)
      comprehensiveness = comprehensiveness + surveyList[i].comprehensiveness
    if (surveyList[i].consistency !== undefined)
      consistency = consistency + surveyList[i].consistency
    if (surveyList[i].problemAdequacy !== undefined)
      problemAdequacy = problemAdequacy + surveyList[i].problemAdequacy

    if (!companyPositionValues[companyPosition[i]])
      companyPositionValues[companyPosition[i]] = 0
    ++companyPositionValues[companyPosition[i]]
    if (!industryBelongValues[industryBelong[i]])
      industryBelongValues[industryBelong[i]] = 0
    ++industryBelongValues[industryBelong[i]]
    if (!amountEmployeesValues[amountEmployees[i]])
      amountEmployeesValues[amountEmployees[i]] = 0
    ++amountEmployeesValues[amountEmployees[i]]
  }

  return (
    <Wrapper>
      <h2> General Statistics</h2>
      <Area>
        <h3>Participants by industry</h3>
        <div className="result">
          <div className="criteria">Number of Participants:</div>
          {/* @ts-ignore */}
          <div className="points">{surveyList.length}</div>
        </div>
        {Object.entries(industryBelongValues).map(([key, value]) => (
          <div className="result">
            <div className="criteria">{key}:</div>
            {/* @ts-ignore */}
            <div className="points">{value}</div>
          </div>
        ))}
      </Area>
      <Area>
        <h3>Participants by company size</h3>
        {Object.entries(amountEmployeesValues).map(([key, value]) => (
          <div className="result">
            <div className="criteria">{key}:</div>
            {/* @ts-ignore */}
            <div className="points">{value}</div>
          </div>
        ))}
      </Area>
      <Area>
        <h3>Participants by position</h3>
        {Object.entries(companyPositionValues).map(([key, value]) => (
          <div className="result">
            <div className="criteria"> {key}:</div>
            <div className="points"> {value}</div>
          </div>
        ))}
      </Area>
      <Area>
        <h3>Feedback</h3>
        <div className="result">
          <p className="criteria">Comprehensiveness</p>
          <p className="points">
            {(comprehensiveness / surveyList.length).toFixed(2)}
          </p>
        </div>
        <div className="result">
          <p className="criteria">Consistency</p>
          <p className="points">
            {(consistency / surveyList.length).toFixed(2)}
          </p>
        </div>
        <div className="result">
          <p className="criteria">Problem adequacy</p>
          <p className="points">
            {(problemAdequacy / surveyList.length).toFixed(2)}
          </p>
        </div>
      </Area>
    </Wrapper>
  )
}

export default GeneralStatistics

const Wrapper = styled.div`
  > h2 {
    ${tw`
      mb-2 mt-6
      text-3xl uppercase font-light
    `}
  }
`

const Area = styled.div`
  ${tw`
    mt-3
  `}
  > h3 {
    ${tw`
      font-medium text-lg 
    `}
  }
  > .result {
    ${tw`
        grid grid-cols-5 
        py-1
    `}

    > .criteria {
      ${tw`
        col-span-4
      `}
    }

    > .points {
      ${tw`
        text-right font-medium
      `}
    }
  }
`
