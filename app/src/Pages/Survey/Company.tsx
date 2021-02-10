import React from 'react';
import AuthCheck from '../../Components/AuthCheck';
import { firestore } from '../../lib/firebase';

const Company = () => {
  const push = () => {
    firestore.collection('answers')
  };


  return (
    <AuthCheck role="user">
      <div>
        <h1>Survey</h1>
        <p>To which industry does the company belong?</p>
        <form onSubmit={push}>
          <input
            placeholder="your answer (up to 50 chars"
            type="text"
            maxLength={50}></input>
          <p>How many employees work in the company?</p>
          <select>
            <option>Please choose an option.</option>
            <option value="1-249">1-249</option>
            <option value="250-999">250-999</option>
            <option value=">1000">greater 1000</option>
          </select>
          <p>What is your position in the company?</p>
          <input
            placeholder="your answer (up to 50 chars"
            type="text"
            maxLength={50}></input>
        </form>
      </div>
    </AuthCheck>
  );
};

export default Company;
