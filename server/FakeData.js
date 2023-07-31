const UserList = [
  {
    id: 1,
    name: "John",
    username: "john",
    age: 23,
    nationality: "CANADA",
    friends: [
      {
        id: 2,
        name: "Kay",
        username: "kay",
        age: 20,
        nationality: "ISKANDAR",
      },
      {
        id: 3,
        name: "Celestine",
        username: "celestine",
        age: 19,
        nationality: "ALASKA",
      },
    ],
  },
  {
    id: 2,
    name: "Kay",
    username: "kay",
    age: 20,
    nationality: "ISKANDAR",
  },
  {
    id: 3,
    name: "Celestine",
    username: "celestine",
    age: 19,
    nationality: "ALASKA",
  },
  {
    id: 4,
    name: "Chelsea",
    username: "chelsea",
    age: 18,
    nationality: "CHELSEA",
    friends: [
      {
        id: 5,
        name: "Manchester",
        username: "manchester",
        age: 23,
        nationality: "MIAMI",
      },
    ],
  },
  {
    id: 5,
    name: "Manchester",
    username: "manchester",
    age: 23,
    nationality: "MIAMI",
  },
];

const MovieList = [
    {
        id: 1,
        name: "Fifty Shade Of Grey",
        yearPublish: 2016,
        isInTheaters: true
    },
    {
        id: 2,
        name: "365 Days",
        yearPublish: 2002,
        isInTheaters: true
    },
    {
        id: 3,
        name: "One piece",
        yearPublish: 1994,
        isInTheaters: true
    },
    {
        id: 4,
        name: "Anabell",
        yearPublish: 1985,
        isInTheaters: true
    },
    {
        id: 5,
        name: "Mad Teddy",
        yearPublish: 2026,
        isInTheaters: true
    }
]
module.exports = { UserList , MovieList};
