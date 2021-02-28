import React from 'react';
import tw, { styled } from 'twin.macro';
import GeneralStatistics from './Components/GeneralStatistics';
import QuestionStatistics from './Components/QuestionStatistics';
import useSurveys from './Hooks/useSurveys';

const Statistics = () => {
  const surveys = useSurveys();
  return (
    <Wrapper>
      <GeneralStatistics surveys={surveys} />
      <QuestionStatistics surveys={surveys} />
    </Wrapper>
  );
};

export default Statistics;

const Wrapper = styled.div``;
