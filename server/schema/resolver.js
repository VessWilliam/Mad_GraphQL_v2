const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
  Query: {
    //user resolver
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },
    // movie resolver
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },

  User: {
    favoriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) => movie.yearPublish >= 2000 && movie.yearPublish <= 2002
      );
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastID = UserList[UserList.length - 1].id;
      user.id = lastID + 1;
      UserList.push(user);
      return user;
    },
    updateUserName: (parent, args) => {
      const {id, newUserName} = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          console.log(user.username);
          user.username = newUserName;
          userUpdated = user;
       
        }
      });
      return userUpdated;
    },

    deleteUser: (parent, args) =>{
        const id = args.id;
        _.remove(UserList, (user)=> user.id === Number(id));
        return null;
    }
  },
};

module.exports = { resolvers };
