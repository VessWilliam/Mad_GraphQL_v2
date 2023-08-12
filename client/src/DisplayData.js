import React, { useState } from "react";
import { useLazyQuery, useQuery, gql, useMutation } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllpeople {
    users {
      ... on usersSucessResult {
        users {
          id
          name
          nationality
          age
          username
        }
      }
      ... on UserErrorResult {
        message
      }
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUsers($input: CreateUser!) {
    createUser(input: $input) {
      id
      name
    }
  }
`;

const QUERY_ALL_MOVIE = gql`
  query GetMovies {
    movies {
      id
      name
    }
  }
`;

const QUERY_MOVIE = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      id
      name
      yearPublish
    }
  }
`;

function DisplayData() {
  const [movieSearch, setMovieSearch] = useState("");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: dataMovie } = useQuery(QUERY_ALL_MOVIE);
  const [fetchMovie, { data: movieSearchData, error: movieError }] =
    useLazyQuery(QUERY_MOVIE);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  // if (data) {
  //   console.log(data);
  // }

  if (loading) {
    return <h1>LOADING DATA...</h1>;
  }
  if (error) {
    console.log(error);
  }
  if (movieError) {
    console.log(movieError);
  }

  return (
    <div className="bg-slate-500 min-h-screen overflow-hidden ">
      <div className="pt-10 flex justify-center">
        <div className="rounded-lg shadow-md p-4 mb-2">
          <ul className="flex flex-col mb-2">
            <input
              onChange={(event) => {
                setName(event.target.value);
              }}
              className="flex flex-col mb-2 rounded-lg"
              type="text"
              placeholder=" Name..."
            />
            <input
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              className="flex flex-col mb-2 rounded-lg"
              type="text"
              placeholder=" UserName..."
            />
            <input
              onChange={(event) => {
                setAge(event.target.value);
              }}
              className="flex flex-col mb-2 rounded-lg"
              type="number"
              placeholder=" Age..."
            />
            <input
              onChange={(event) => {
                setNationality(event.target.value.toUpperCase());
              }}
              className="flex flex-col mb-2 rounded-lg"
              type="text"
              placeholder=" Nationality..."
            />
            <button
              className="rounded-lg pl-3 pr-3 ml-3 bg-green-800"
              onClick={() => {
                createUser({
                  variables: {
                    input: { name, username, age: Number(age), nationality },
                  },
                });

                refetch();
              }}
            >
              <span className="text-center text-gray-200 justify-items-center">
                Create User
              </span>
            </button>
          </ul>
        </div>
      </div>

      <div className="pt-10 flex justify-center">
        <div className="rounded-lg shadow-md p-2 mb-4">
          <div className="mb-2">
            <input
              className="rounded-lg pr-3"
              type="text"
              placeholder=" Movie Name"
              onChange={(event) => {
                setMovieSearch(event.target.value);
              }}
            />
            <button
              className="rounded-lg pl-3 pr-3 ml-3 bg-green-800"
              onClick={() => {
                fetchMovie({
                  variables: {
                    name: movieSearch,
                  },
                });
              }}
            >
              <span className="text-center text-gray-200 justify-items-center">
                Search Data
              </span>
            </button>
          </div>

          {movieSearchData && (
            <div>
              <h1 className="text-gray-200 rounded-lg bg-slate-700 font-bold flex justify-center mb-1">
                Movie Table
              </h1>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="text-gray-200 pr-4 text-center">Movie</th>
                    <th className="text-gray-200 pr-4 text-center">Publish</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={movieSearchData.id}>
                    <td className="text-sm text-ellipsis text-slate-900  pr-4 text-center">
                      {movieSearchData.movie.name}
                    </td>
                    <td className="text-sm text-ellipsis text-slate-900 pr-4 text-center">
                      {movieSearchData.movie.yearPublish}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {movieError && <h1>Error fetching movie data</h1>}
        </div>
      </div>

      <div className="pt-10 mb-0 flex justify-center">
        {data && (
          <div className="rounded-lg shadow-md p-2">
            <h1 className="text-gray-200 rounded-lg bg-slate-700 font-bold flex justify-center mb-1">
              Users Table
            </h1>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="text-gray-200 pr-4 text-center">Name</th>
                  <th className="text-gray-200 pr-4 text-center">Username</th>
                  <th className="text-gray-200 pr-4 text-center">Age</th>
                  <th className="text-gray-200 pr-4 text-center">
                    Nationality
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.users.users.map((user) => (
                  <tr key={user.id}>
                    <td className=" text-sm text-ellipsis  text-slate-900 pr-4 text-center">
                      {user.name}
                    </td>
                    <td className=" text-sm text-ellipsis  text-slate-900 pr-4 text-center">
                      {user.username}
                    </td>
                    <td className=" text-sm text-ellipsis  text-slate-900 pr-4 text-center">
                      {user.age}
                    </td>
                    <td className=" text-sm text-ellipsis  text-slate-900 pr-4 text-center">
                      {user.nationality}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="pt-10 mb-0 flex justify-center">
        <div className="rounded-lg shadow-md p-2">
          <h1 className="text-gray-200 rounded-lg bg-slate-700 font-bold flex justify-center mb-1">
            Movies Table
          </h1>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="text-gray-200 pr-4 text-center">Movies</th>
              </tr>
            </thead>
            <tbody>
              {dataMovie &&
                dataMovie.movies.map((movie) => (
                  <tr key={movie.id}>
                    <td className="text-sm  text-slate-900 text-ellipsis pr-4 text-center">
                      {movie.name}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
