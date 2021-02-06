import React from 'react';
import Questions from '../Components/Questions';
import Raiting from '../Components/Rating';

const Survey = () => {
  return (
    <div>
      <Questions />
      <p>Focus area:</p>
      <p>FetchDB</p>
      <p>Digital Capability:</p>
      <p>FetchDB</p>
      <p>Practice Item</p>
      <p>FetchDB</p>
      <p>
        Rate your company - to which level has your company
        implemented the practice item
      </p>
      <Raiting min={'not implemented'} max={'fully implemented'} />
    </div>
  );
};

export default Survey;
