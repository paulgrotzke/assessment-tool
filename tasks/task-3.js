const users = {
  'id-1': {
    name: 'user-1',
    address: {
      street: 'street 1',
      city: 'city 1',
    },
  },
  'id-2': {
    name: 'user-2',
    address: {
      street: 'street 2',
      city: 'city 1',
    },
  },
  'id-3': {
    name: 'user-3',
    address: {
      street: 'street 3',
      city: 'city 2',
    },
  },
};

const expectedResult = {
  'city 1': [
    {
      id: 'id-1',
      name: 'user-1',
      address: {
        street: 'street 1',
        city: 'city 1',
      },
    },
    {
      id: 'id-2',
      name: 'user-2',
      address: {
        street: 'street 2',
        city: 'city 1',
      },
    },
  ],
  'city 2': [
    {
      id: 'id-3',
      name: 'user-3',
      address: {
        street: 'street 3',
        city: 'city 2',
      },
    },
  ],
};

// cast to array grouped by city
function format(users) {
  let result = {};

  for (let key in users) {
    result = {
      ...result,
      [users[key]['address']['city']]: [],
    };
  }

  for (let key in result) {
    for (let innerKey in users) {
      if (key === users[innerKey]['address']['city']) {
        result[key].push({
          id: innerKey,
          name: users[innerKey]['name'],
          address: {
            street: users[innerKey]['address']['street'],
            city: users[innerKey]['address']['city'],
          },
        });
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