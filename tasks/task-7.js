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

  let finalFriends = {};
  for (let key in transformFriends) {
    if (transformFriends[key].length !== 0) {
      for (let innerKey in transformFriends[key]) {
        if (key !== innerKey) {
          finalFriends = {
            ...finalFriends,
            [key]: {
              ...finalFriends,
              [innerKey]: true,
            },
          };
        }
      }
    } else {
      finalFriends = {
        ...finalFriends,
        [key]: [],
      };
    }
  }

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
      subFriends: [],
    });
  }

  for (let key in result) {
    for (let friendsKey in finalFriends) {
      console.log(Object.keys(finalFriends[friendsKey]).toString());
      if (result[key]['id'] === friendsKey) {
        if (Object.keys(finalFriends[friendsKey]).length > 0) {
          result[key]['subFriends'].push(
            Object.keys(finalFriends[friendsKey]).toString(),
          );
        }
      }
    }
  }

  return result;
}

const result = format(users);

console.log(JSON.stringify(result, null, 2));
console.log(
  JSON.stringify(result, null, 2) ===
    JSON.stringify(expectedResult, null, 2),
);
