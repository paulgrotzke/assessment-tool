const users = [
  {
    id: 'id-1',
    name: 'user-1',
    address: {
      street: 'street 1',
      city: 'city 1',
    },
    friends: ['id-2'],
  },
  {
    id: 'id-2',
    name: 'user-2',
    address: {
      street: 'street 2',
      city: 'city 2',
    },
    friends: ['id-1', 'id-3'],
  },
  {
    id: 'id-3',
    name: 'user-3',
    address: {
      street: 'street 3',
      city: 'city 3',
    },
    friends: [],
  },
];

const expectedResult = [
  {
    id: 'id-1',
    name: 'user-1',
    address: {
      street: 'street 1',
      city: 'city 1',
    },
    friends: ['id-2'],
    subFriends: ['id-3'],
  },
  {
    id: 'id-2',
    name: 'user-2',
    address: {
      street: 'street 2',
      city: 'city 2',
    },
    friends: ['id-1', 'id-3'],
    subFriends: [],
  },
  {
    id: 'id-3',
    name: 'user-3',
    address: {
      street: 'street 3',
      city: 'city 3',
    },
    friends: [],
    subFriends: [],
  },
];

// update sub-friends (-> friends that friends have and that are not in the own friend-list)
function format(users) {
  let friends = {};
  for (let key in users) {
    if (users[key]['friends'].length !== 0) {
      for (let m in users[key]['friends']) {
        friends = {
          ...friends,
          [users[key]['id']]: {
            ...friends[users[key]['id']],
            [users[key]['friends'][m]]: true,
          },
        };
      }
    } else {
      friends = {
        ...friends,
        [users[key]['id']]: [],
      };
    }
  }

  let transformFriends = {};
  for (let key in friends) {
    if (Object.keys(friends[key]).length !== 0) {
      for (let innerKey in friends[key]) {
        transformFriends = {
          ...transformFriends,
          [key]: friends[innerKey],
        };
      }
    } else {
      transformFriends = {
        ...transformFriends,
        [key]: [],
      };
    }
  }
  // console.log(transformFriends);
  //{ 'id-1': { 'id-1': true, 'id-3': true }, 'id-2': [], 'id-3': [] }

  let result = [];
  for (let key in users) {
    result.push({
      id: users[key]['id'],
      name: users[key]['name'],
      address: {
        street: users[key]['address']['street'],
        city: users[key]['address']['city'],
      },
      friends: users[key]['friends'],
      subFriends: transformFriends[users[key]['id']],
    });
  }

  //subfriends: { 'id-1': [ 'id-2' ], 'id-2': [ 'id-1', 'id-3' ], 'id-3': [] }

  // let finalFriends = {};
  // for (let key of Object.keys(subFriends)) {
  //   if (subFriends[key].length === 0) {
  //     finalFriends = {
  //       ...finalFriends,
  //       [key]: [],
  //     };
  //   }
  //   for (let m in subFriends[key]) {
  //     finalFriends = {
  //       ...finalFriends,
  //       [key]: {
  //         ...finalFriends[key],
  //         [subFriends[key][m]]: true,
  //       },
  //     };
  //   }
  // }
  // finalfriends
  // {
  //   'id-1': { 'id-2': true },
  //   'id-2': { 'id-1': true, 'id-3': true },
  //   'id-3': []
  // }
  // let finalFriends2 = {};
  // for (let key in finalFriends) {
  //   if (Object.keys(finalFriends[key]).length !== 0) {
  //     for (let innerKey in finalFriends[key]) {
  //       finalFriends2 = {
  //         ...finalFriends2,
  //         [key]: finalFriends[innerKey],
  //       };
  //     }
  //   } else {
  //     finalFriends2 = {
  //       ...finalFriends2,
  //       [key]: [],
  //     };
  //   }
  // }
  // for (let key in finalFriends2) {
  //   if (finalFriends2[key].length !== 0) {
  //     for (let innerKey in finalFriends2[key]) {
  //       // console.log(innerKey);
  //     }
  //   }
  // }
  // console.log(finalFriends2);

  return result;
}

const result = format(users);

console.log(JSON.stringify(result, null, 2));
