const users = [
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
      city: 'city 2',
    },
  },
  {
    id: 'id-3',
    name: 'user-3',
    address: {
      street: 'street 3',
      city: 'city 3',
    },
  },
];

const expectedResult = {
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
      city: 'city 2',
    },
  },
  'id-3': {
    name: 'user-3',
    address: {
      street: 'street 3',
      city: 'city 3',
    },
  },
};

// cast to object
function format(users) {
  let result = {};

  for (let key in users) {
    result = {
      ...result,
      [users[key]['id']]: {
        name: users[key]['name'],
        address: {
          street: users[key]['address']['street'],
          city: users[key]['address']['city'],
        },
      },
    };
  }

  return result;
}

const result = format(users);
console.log(JSON.stringify(result, null, 2));

console.log(
  JSON.stringify(result, null, 2) ===
    JSON.stringify(expectedResult, null, 2),
);
