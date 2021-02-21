import React from 'react';
import AuthCheck from '../../../Components/AuthCheck';
import useResults from '../Hooks/useResults';

const Results = () => {
  const results = useResults();

  const areas = {};
  for (const result of results) {
    const {
      answerValue,
      focusArea,
      digitalCapability,
      practiceItem,
    } = result;
    if (!areas[focusArea]) areas[focusArea] = {};
    if (!areas[focusArea][digitalCapability])
      areas[focusArea][digitalCapability] = {};
    areas[focusArea][digitalCapability][practiceItem] = answerValue;
  }
  const resultList = Object.keys(areas).map((key) => ({
    [key]: areas[key],
  }));

  return (
    <AuthCheck role="user">
      <h1>Great!</h1>
      <p>You have successfully passed the assessment!</p>
      <p>
        If you want to have the corresponding, please provide your
        email.
      </p>
      <p>
        After clicking on submit, the evaluation will be sent to you
        in PDF format.
      </p>
      <div>
        {resultList.map((result) => (
          <div>
            {Object.keys(result)}
            {Object.keys(result[Object.keys(result)[0]]).map(
              (capabilities) => (
                <li>
                  {capabilities}
                  {Object.entries(
                    result[Object.keys(result)[0]][capabilities],
                  ).map((practiceItem) => (
                    <li
                      style={{
                        marginLeft: 20,
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      {practiceItem[0] +
                        ': ' +
                        practiceItem[1] +
                        ' Punkte'}
                    </li>
                  ))}
                </li>
              ),
            )}
          </div>
        ))}
      </div>
    </AuthCheck>
  );
};

export default Results;
