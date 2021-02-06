import React from 'react';

type Props = {
  min: string;
  max: string;
};

const Raiting = (props: Props) => {
  return (
    <div>
      <p>{props.min}</p>
      <div>
        <input type="radio" value={1} name="drone"></input>
      </div>
      <div>
        <input type="radio" value={2} name="drone"></input>
      </div>
      <div>
        <input type="radio" value={3} name="drone"></input>
      </div>
      <div>
        <input type="radio" value={4} name="drone"></input>
      </div>
      <div>
        <input type="radio" value={5} name="drone"></input>
      </div>
      <p>{props.max}</p>
    </div>
  );
};

export default Raiting;
