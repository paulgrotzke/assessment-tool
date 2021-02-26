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
  // let formattedFriends = {};
  // for (let key in users) {
  //   formattedFriends = {
  //     ...formattedFriends,
  //     [users[key]['id']]: users[key]['friends'],
  //   };
  // }
  // console.log(formattedFriends);

  let formattedFriends = {};
  for (let key in users) {
    if (users[key]['friends'].length > 0) {
      for (let secondKey in users) {
        if (users[key]['id'] === users[secondKey]['id']) {
          formattedFriends = {
            ...formattedFriends,
            [users[key]['id']]: {
              ...formattedFriends[users[key]['id']],
              [users[secondKey]['id']]: false,
            },
          }; 
        } 
        else {
          formattedFriends = {
            ...formattedFriends,
            [users[key]['id']]: {
              ...formattedFriends[users[key]['id']],
              [users[secondKey]['id']]: true,
            },
          };
        }
      }
    } else {
      formattedFriends = {
        ...formattedFriends,
        [users[key]['id']]: [],
      };
    }
  }
  console.log(formattedFriends);

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

  return result;
}

const result = format(users);

// console.log(JSON.stringify(result, null, 2));
