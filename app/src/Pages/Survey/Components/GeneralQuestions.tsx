import React from 'react';
import AuthCheck from '../../../Components/AuthCheck';
import * as t from '../types';

type Props = {
  generalQuestions: t.GeneralQuestionsAnswer;
  setGeneralQuestions: (answer: t.GeneralQuestionsAnswer) => void;
  setShowGeneralQuestions: (bool: boolean) => void;
  postgeneralQuestion: () => void;
};

const GeneralQuestions = (props: Props) => {
  return (
    <AuthCheck role="user">
      <div>
        <h1>Survey</h1>
        <p>To which industry does the company belong?</p>

        <input
          placeholder="your answer (up to 50 chars)"
          type="text"
          maxLength={50}
          onChange={(e) => {
            props.setGeneralQuestions({
              ...props.generalQuestions,
              industryBelong: e.target.value,
            });
          }}></input>
        <p>How many employees work in the company?</p>
        <select
          onChange={(e) => {
            props.setGeneralQuestions({
              ...props.generalQuestions,
              amountEmployees: e.target.value,
            });
          }}>
          <option>Please choose an option.</option>
          <option value="1-249">1-249</option>
          <option value="250-999">250-999</option>
          <option value=">1000">greater 1000</option>
        </select>
        <p>What is your position in the company?</p>
        <input
          placeholder="your answer (up to 50 chars)"
          type="text"
          maxLength={50}
          onChange={(e) => {
            props.setGeneralQuestions({
              ...props.generalQuestions,
              companyPosition: e.target.value,
            });
          }}></input>
        <button
          onClick={() => {
            props.postgeneralQuestion();
            props.setShowGeneralQuestions(false);
          }}>
          Next Question
        </button>
      </div>
    </AuthCheck>
  );
};

export default GeneralQuestions;
