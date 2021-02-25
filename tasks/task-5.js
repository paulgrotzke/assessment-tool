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

function format(users) {
  let result = {};
  for (let key in users) {
    const {
      id,
      name,
      address: { street, city },
      friends,
    } = users[key];
    if (friends.length > 0) {
      for (let i = 0; i < friends.length; i++) {
        if (result[id] !== undefined) {
          // console.log(result[id]['friends'])
          result = {
            ...result,
            [id]: {
              name: name,
              address: {
                street: street,
                city: city,
              },
              friends: {
                ...result[id]['friends'],
                [friends[i]]: {},
              },
            },
          };
        } else {
          result = {
            ...result,
            [id]: {
              name: name,
              address: {
                street: street,
                city: city,
              },
              friends: {
                [friends[i]]: {},
              },
            },
          };
        }
      }
    } else {
      result = {
        ...result,
        [id]: {
          name: name,
          address: {
            street: street,
            city: city,
          },
          friends: {},
        },
      };
    }
  }
  return result;
}

const expectedResult = {
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
          city: 'city 1',
        },
        friends: ['id-1', 'id-3'],
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

// unflatt to object

const result = format(users);
console.log(JSON.stringify(result, null, 2));
// console.log(
//   JSON.stringify(result, null, 2) ===
//     JSON.stringify(expectedResult, null, 2),
// );
