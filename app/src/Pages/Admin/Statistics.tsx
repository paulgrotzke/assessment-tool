import React from 'react';
import AuthCheck from '../../Components/AuthCheck';
import GeneralStatistics from './Components/GeneralStatistics';
import QuestionStatistics from './Components/QuestionStatistics';
import useSurveys from './Hooks/useSurveys';

const Statistics = () => {
  const surveys = useSurveys();
  return (
    <AuthCheck role="admin">
      <GeneralStatistics surveys={surveys} />
      <QuestionStatistics surveys={surveys}/>
    </AuthCheck>
  );
};

export default Statistics;
