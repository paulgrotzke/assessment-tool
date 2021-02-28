import React from 'react';
import tw, { styled } from 'twin.macro';
import AuthCheck from '../../../Components/AuthCheck';
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

  console.log(resultList);
  console.log(results);

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
              <li>
                {capabilities}
                {Object.entries(result[Object.keys(result)[0]][capabilities]).map(
                  (practiceItem) => (
                    <li
                      style={{
                        marginLeft: 20,
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      {practiceItem[0] + ': ' + practiceItem[1] + ' Punkte'}
                    </li>
                  ),
                )}
              </li>
            ))}
          </FocusArea>
        ))}
      </div>
    </Wrapper>
  );
};

export default Results;

const Wrapper = styled.div`
  ${tw`
      rounded-md shadow-xl p-6 mt-6 bg-gray-100 mb-6
    `}

  > h2 {
    ${tw`
      mb-6
      font-extrabold text-2xl uppercase
    `}

    > .question {
      ${tw`
      text-2xl text-indigo-500
    `}
    }
  }
`;

const FocusArea = styled.div`
  ${tw`
     rounded-md shadow-xl p-4 mt-6 bg-gray-100 mb-6
    `}

  > h3 {
    ${tw`
      mt-2 mb-1
      font-semibold text-xl text-indigo-600
    `}
  }
`;

const Input = styled.input`
  ${tw`
      flex-none mt-1 mx-1 checked:bg-indigo-500
    `}
`;
