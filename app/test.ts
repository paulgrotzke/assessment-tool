// beispielinput, wie die fragen in firestore gespeichert werden
let questions = [
  {
    focusArea: 'Focus1',
    digitalCapability: 'Capability 1',
    practiceItem: 'Frage 1',
  },
  {
    focusArea: 'Focus1',
    digitalCapability: 'Capability 2',
    practiceItem: 'Frage 2',
  },
  {
    focusArea: 'Focus1',
    digitalCapability: 'Capability 3',
    practiceItem: 'Frage 3',
  },
  {
    focusArea: 'Focus2',
    digitalCapability: 'Capability 1',
    practiceItem: 'Frage A',
  },
  {
    focusArea: 'Focus2',
    digitalCapability: 'Capability 2',
    practiceItem: 'Frage B',
  },
  {
    focusArea: 'Focus2',
    digitalCapability: 'Capability 2',
    practiceItem: 'Frage C',
  },
  {
    focusArea: 'Focus3',
    digitalCapability: 'Capability 1',
    practiceItem: 'Frage E',
  },
  {
    focusArea: 'Focus3',
    digitalCapability: 'Capability 1',
    practiceItem: 'Frage R',
  },
  {
    focusArea: 'Focus3',
    digitalCapability: 'Capability 1',
    practiceItem: 'Frage T',
  },
];

// beispiel wie der output ausschauen sollte
// let result = [
//   {},
//   {
//     Focus1: {
//       Capability 1: {
//         Frage 1: 0,
//       },
//       Capability 2: {
//         Frage 2: 0,
//       },
//       Capability 3: {
//         Frage 3: 0,
//       },
//     },
//   },
//   //   {
//     Focus2: {
//       Capability 1: {
//         Frage A: 0,
//       },
//       Capability 2: {
//         Frage B: 0,
//       },
//       Capability 2: {
//         Frage C: 0,
//       },
//     },
//   },
//   {
//     Focus3: {
//       Capability 1: {
//         Frage E: 0,
//       },
//       Capability 1: {
//         Frage R: 0,
//       },
//       Capability 1: {
//         Frage T: 0,
//       },
//     },
//   },
// ];

let questionList = [{}];

for (let m in questions) {
  questionList = {
    ...questionList,
    [questions[m].focusArea]: {
      ...questionList[questions[m].focusArea],
      [questions[m].digitalCapability]: {
        ...questionList[questions[m].focusArea],
        // diese zeile versucht glaube (?) das problem 
        // ich würde hier eigentlich den vorherigen state wie folgt übernehmen
        // ...questionList[questions[m].focusArea][questions[m].digitalCapability]
        // aber das klappt nicht
        [questions[m].practiceItem]: 0,
      },
    },
  };
}

console.log(questionList);
