import React from 'react';
import tw, { styled } from 'twin.macro';
import useResults from '../Hooks/useResults';

const Results = () => {
  const results = useResults();

  const areas = {};
  for (const result of results) {
    const { answerValue, focusArea, digitalCapability, practiceItem } = result;
    if (!areas[focusArea]) areas[focusArea] = {};
    if (!areas[focusArea][digitalCapability]) areas[focusArea][digitalCapability] = {};
    areas[focusArea][digitalCapability][practiceItem] = answerValue;
  }
  const resultList = Object.keys(areas).map((key) => ({
    [key]: areas[key],
  }));

  return (
    <Wrapper>
      <h2>Great!</h2>
      <p>You have successfully passed the assessment!</p>
      <p>If you want to have the corresponding, please provide your email.</p>
      <p>After clicking on submit, the evaluation will be sent to you in PDF format.</p>
      <div>
        {resultList.map((result) => (
          <FocusArea>
            <h3>{Object.keys(result)}</h3>
            {Object.keys(result[Object.keys(result)[0]]).map((capabilities) => (
              <div className="capa-wrapper">
                <p className="capabilities">{capabilities}</p>
                {Object.entries(result[Object.keys(result)[0]][capabilities]).map(
                  (practiceItem) => (
                    <div className="result">
                      <div className="practiceItem">{practiceItem[0] + ' '}</div>
                      <div className="points">{practiceItem[1] + ' P.'}</div>
                    </div>
                  ),
                )}
              </div>
            ))}
          </FocusArea>
        ))}
      </div>
    </Wrapper>
  );
};

export default Results;

const Wrapper = styled.div`
  > h2 {
    ${tw`
      mb-6 mt-6
      font-extrabold text-2xl uppercase
    `}
  }
`;

const FocusArea = styled.div`
  ${tw`
     rounded-md shadow-2xl mt-6 bg-gray-100 mb-6
    `}

  > h3 {
    ${tw`
      px-4 py-2
      mt-2 mb-1
      font-semibold text-xl text-white
      bg-indigo-600 rounded-sm
    `}
  }

  > .capa-wrapper {
    ${tw`
     px-4 py-2
    `}

    > .capabilities {
      ${tw`
      font-semibold text-lg
      
    `}
    }

    > .result {
      ${tw`
        grid grid-cols-5 py-1
      `}

      > .practiceItem {
        ${tw`
        col-span-4
        `}
      }

      > .points {
        ${tw`
        text-right font-semibold
        `}
      }
    }
  }
`;
