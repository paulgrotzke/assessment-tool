import React from 'react';
import tw, { styled } from 'twin.macro';
import useResults from '../Hooks/useResults';

const Results = () => {
  const results = useResults();

  const areas = {};
  let capabilityScoring = {};
  let focusAreaScoring = {};
  for (const result of results) {
    const { answerValue, focusArea, digitalCapability, practiceItem } = result;
    if (!areas[focusArea]) {
      areas[focusArea] = {};
      capabilityScoring[focusArea] = {};
    }
    if (!areas[focusArea][digitalCapability]) {
      areas[focusArea][digitalCapability] = {};
      capabilityScoring[focusArea][digitalCapability] = 0;
      focusAreaScoring[focusArea] = 0;
    }
    areas[focusArea][digitalCapability][practiceItem] = answerValue;
    capabilityScoring[focusArea][digitalCapability] += answerValue;
    focusAreaScoring[focusArea] +=
      capabilityScoring[focusArea][digitalCapability];
  }
  const resultList = Object.keys(areas).map((key) => ({
    [key]: areas[key],
  }));

  console.log(capabilityScoring)
  // console.log(focusAreaScoring);
  // for (let focusArea in capabilityScoring) {
  //   console.log(capabilityScoring[focusArea])
  //   if (!focusAreaScoring[focusArea]) {
  //     focusAreaScoring[focusArea] = 0
  //   }
  //   // focusAreaScoring[focusArea] +=
  //   // focusAreaScoring[focusArea] +
  // }
  // console.log(focusAreaScoring)

  return (
    <Wrapper>
      <div className="no-print">
        <h2>Great!</h2>
        <p>You have successfully passed the assessment.</p>
        <p>
          You can
          <span onClick={() => window.print()}> save</span> your results if you
          want to.
        </p>
      </div>
      <div className="printable">
        {resultList.map((result) => (
          <FocusArea>
            <h3>{Object.keys(result)}</h3>
            {Object.keys(result[Object.keys(result)[0]]).map((capabilities) => (
              <div className="capa-wrapper">
                <p className="capabilities">{capabilities}</p>
                {Object.entries(
                  result[Object.keys(result)[0]][capabilities],
                ).map((practiceItem) => (
                  <div className="result">
                    <div className="practiceItem">{practiceItem[0] + ' '}</div>
                    <div className="points">{practiceItem[1] + ' P.'}</div>
                  </div>
                ))}
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
  > .no-print {
    > h2 {
      ${tw`
      mb-6 mt-6
      font-extrabold text-2xl uppercase
    `}
    }
    > p {
      > span {
        ${tw`
      font-extrabold cursor-pointer
      text-indigo-600 hover:text-indigo-500
    `}
      }
    }
  }

  @media print {
    .no-print {
      display: none;
    }
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
