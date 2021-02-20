
const users = [
  {
    id: 'id-1',
    name: 'user-1',
    address: {
      street: 'street 1',
      city: 'city 1'
    },
    friends: ['id-2']
  },{
    id: 'id-2',
    name: 'user-2',
    address: {
      street: 'street 2',
      city: 'city 2'
    },
    friends: ['id-1', 'id-3']
  },{
    id: 'id-3',
    name: 'user-3',
    address: {
      street: 'street 3',
      city: 'city 3'
    },
    friends: []
  },
]


// update sub-friends (-> friends that friends have and that are not in the own friend-list)
function format (users) {
  // to implement
}

const result = format(users)

console.log(JSON.stringify(result, null, 2))

const expectedResult = [
  {
    id: 'id-1',
    name: 'user-1',
    address: {
      street: 'street 1',
      city: 'city 1'
    },
    friends: ['id-2'],
    subFriends: ['id-3']
  },{
    id: 'id-2',
    name: 'user-2',
    address: {
      street: 'street 2',
      city: 'city 2'
    },
    friends: ['id-1', 'id-3'],
    subFriends: []
  },{
    id: 'id-3',
    name: 'user-3',
    address: {
      street: 'street 3',
      city: 'city 3'
    },
    friends: [],
    subFriends: []
  },
]

