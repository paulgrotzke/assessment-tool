import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import AuthCheck from '../../Components/AuthCheck';
import useSurveys from './Hooks/useSurveys';
import GeneralStatistics from './Components/GeneralStatistics';
import QuestionStatistics from './Components/QuestionStatistics';
import Buttons from './Components/Buttons';
import Configuration from './Components/Configuration';

const Controllcenter = () => {
  const surveys = useSurveys();

  const [focusArea, setFocusArea] = useState('');
  const [digitalCapability, setDigitalCapability] = useState('');
  const [practiceItem, setPracticeItem] = useState('');

  const [showQuestionStatistics, setShowQuestionStatistics] = useState(true);
  const [showGeneral, setShowGeneral] = useState(false);
  const [showConfiguration, setShowConfiguration] = useState(false);

  console.log(showQuestionStatistics);
  console.log(showGeneral);

  if (showQuestionStatistics) {
    <AuthCheck role="admin">
      <Wrapper>
        <Buttons
          showGeneral={showGeneral}
          setShowGeneral={setShowGeneral}
          showQuestionStatistics={showQuestionStatistics}
          setShowQuestionStatistics={setShowQuestionStatistics}
          showConfiguration={showConfiguration}
          setShowConfiguration={setShowConfiguration}
        />
        <GeneralStatistics surveys={surveys} />
      </Wrapper>
    </AuthCheck>
  }

  if (showConfiguration) {
    return (
      <AuthCheck role="admin">
        <Wrapper>
          <Buttons
            showGeneral={showGeneral}
            setShowGeneral={setShowGeneral}
            showQuestionStatistics={showQuestionStatistics}
            setShowQuestionStatistics={setShowQuestionStatistics}
            showConfiguration={showConfiguration}
            setShowConfiguration={setShowConfiguration}
          />
          <Configuration
            focusArea={focusArea}
            setFocusArea={setFocusArea}
            digitalCapability={digitalCapability}
            setDigitalCapability={setDigitalCapability}
            practiceItem={practiceItem}
            setPracticeItem={setPracticeItem}
          />
        </Wrapper>
      </AuthCheck>
    );
  }
  return (
    <AuthCheck role="admin">
      <Wrapper>
        <Buttons
          showGeneral={showGeneral}
          setShowGeneral={setShowGeneral}
          showQuestionStatistics={showQuestionStatistics}
          setShowQuestionStatistics={setShowQuestionStatistics}
          showConfiguration={showConfiguration}
          setShowConfiguration={setShowConfiguration}
        />
        <QuestionStatistics surveys={surveys} />
      </Wrapper>
      ;
    </AuthCheck>
  );
};

export default Controllcenter;

const Wrapper = styled.div`
  ${tw`
    max-w-xl bg-white px-10 py-6 rounded-md shadow-2xl
  `}

  > h2 {
    ${tw`
      mb-6
      pt-8
      font-extrabold text-2xl uppercase
    `}
  }

  > h3 {
    ${tw`
      mt-4
      mb-1
      font-semibold text-lg
    `}
  }
`;
