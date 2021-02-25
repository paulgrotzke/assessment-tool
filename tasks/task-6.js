const users = {
  'id-1': {
    name: 'user-1',
    address: {
      street: 'street 1',
      city: 'city 1',
    },
    friends: {
      'id-2': {
        name: 'user-2',
        address: {
          street: 'street 2',
          city: 'city 2',
        },
        friends: ['id-1', 'id-2'],
      },
    },
  },
  'id-2': {
    name: 'user-2',
    address: {
      street: 'street 2',
      city: 'city 2',
    },
    friends: {
      'id-1': {
        id: 'id-1',
        name: 'user-1',
        address: {
          street: 'street 1',
          city: 'city 1',
        },
        friends: ['id-2'],
      },
      'id-3': {
        id: 'id-3',
        name: 'user-3',
        address: {
          street: 'street 3',
          city: 'city 3',
        },
        friends: [],
      },
    },
  },
  'id-3': {
    name: 'user-3',
    address: {
      street: 'street 3',
      city: 'city 3',
    },
    friends: {},
  },
};

const expectedResult = [
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

const result = format(users);

// flatt to array
function format(users) {
  let formattedFriends = {};
  for (let key in users) {
    formattedFriends = {
      ...formattedFriends,
      [key]: Object.keys(users[key]['friends']),
    };
  }

  let result = [];
  for (let key in users) {
    result.push({
      id: key,
      name: users[key]['name'],
      address: {
        street: users[key]['address']['street'],
        city: users[key]['address']['city'],
      },
      friends: formattedFriends[key],
    });
  }

  return result;
}

console.log(JSON.stringify(result, null, 2));
console.log(
  JSON.stringify(result, null, 2) ===
    JSON.stringify(expectedResult, null, 2),
);
