import * as t from '../types';

type Props = {
  surveys: {
    surveyData: t.GeneralQuestions[];
    docs: string[];
  };
};

const GeneralStatistics = (props: Props) => {
  const surveyList = props.surveys.surveyData;

  let amountEmployees: string[] = [];
  let companyPosition: string[] = [];
  let industryBelong: string[] = [];
  let comprehensiveness: number = 0;
  let consistency: number = 0;
  let problemAdequacy: number = 0;
  const companyPositionValues = {};
  const industryBelongValues = {};
  const amountEmployeesValues = {};

  for (let i in surveyList) {
    amountEmployees.push(surveyList[i].amountEmployees);
    companyPosition.push(surveyList[i].companyPosition);
    industryBelong.push(surveyList[i].industryBelong);
    comprehensiveness = comprehensiveness + surveyList[i].comprehensiveness;
    consistency = consistency + surveyList[i].consistency;
    problemAdequacy = problemAdequacy + surveyList[i].problemAdequacy;

    if (!companyPositionValues[companyPosition[i]])
      companyPositionValues[companyPosition[i]] = 0;
    ++companyPositionValues[companyPosition[i]];
    if (!industryBelongValues[industryBelong[i]])
      industryBelongValues[industryBelong[i]] = 0;
    ++industryBelongValues[industryBelong[i]];
    if (!amountEmployeesValues[amountEmployees[i]])
      amountEmployeesValues[amountEmployees[i]] = 0;
    ++amountEmployeesValues[amountEmployees[i]];
  }

  return (
    <div>
      <h1> General Statistics</h1>
      <p>Ø - digital Score</p>
      <p>todo</p>
      <p># Participants</p>
      <p>{surveyList.length}</p>
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
      <p>{comprehensiveness / surveyList.length}</p>
      <p>Ø - Consistency</p>
      <p>{consistency / surveyList.length}</p>
      <p>Ø - Problem adequacy</p>
      <p>{problemAdequacy / surveyList.length}</p>
    </div>
  );
};

export default GeneralStatistics;
