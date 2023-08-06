import React, { useState } from "react";
import { useLazyQuery, useQuery, gql, useMutation } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllpeople {
    users {
      id
      name
      nationality
      age
      username
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUsers($input: CreateUser!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const QUERY_ALL_MOVIE = gql`
  query GetMovies {
    movies {
      name
    }
  }
`;

const QUERY_MOVIE = gql`
  query Movie($name: String!) {
    movie(name: $name) {
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
    <div class="bg-slate-500 min-h-screen overflow-hidden ">
      <div class="pt-10 flex justify-center">
        <div class="rounded-lg shadow-md p-4 mb-2">
          <ul class="flex flex-col mb-2">
            <input
              onChange={(event) => {
                setName(event.target.value);
              }}
              class="flex flex-col mb-2 rounded-lg"
              type="text"
              placeholder=" Name..."
            />
            <input
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              class="flex flex-col mb-2 rounded-lg"
              type="text"
              placeholder=" UserName..."
            />
            <input
              onChange={(event) => {
                setAge(event.target.value);
              }}
              class="flex flex-col mb-2 rounded-lg"
              type="number"
              placeholder=" Age..."
            />
            <input
              onChange={(event) => {
                setNationality(event.target.value.toUpperCase());
              }}
              class="flex flex-col mb-2 rounded-lg"
              type="text"
              placeholder=" Nationality..."
            />
            <button
              class="rounded-lg pl-3 pr-3 ml-3 bg-green-800"
              onClick={() => {
                createUser({
                  variables: {
                    input: { name, username, age: Number(age), nationality },
                  },
                });

                refetch();
              }}
            >
              <span class="text-center text-gray-200 justify-items-center">
                Create User
              </span>
            </button>
          </ul>
        </div>
      </div>

      <div class="pt-10 flex justify-center">
        <div class="rounded-lg shadow-md p-2 mb-4">
          <div class="mb-2">
            <input
              class="rounded-lg pr-3"
              type="text"
              placeholder=" Movie Name"
              onChange={(event) => {
                setMovieSearch(event.target.value);
              }}
            />
            <button
              class="rounded-lg pl-3 pr-3 ml-3 bg-green-800"
              onClick={() => {
                fetchMovie({
                  variables: {
                    name: movieSearch,
                  },
                });
              }}
            >
              <span class="text-center text-gray-200 justify-items-center">
                Search Data
              </span>
            </button>
          </div>

          {movieSearchData && (
            <div>
              <h1 class="text-gray-200 rounded-lg bg-slate-700 font-bold flex justify-center mb-1">
                Movie Table
              </h1>
              <table class="table-auto">
                <thead>
                  <tr>
                    <th class="text-gray-200 pr-4 text-center">Movie</th>
                    <th class="text-gray-200 pr-4 text-center">Publish</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-sm text-ellipsis text-slate-900  pr-4 text-center">
                      {movieSearchData.movie.name}
                    </td>
                    <td class="text-sm text-ellipsis text-slate-900 pr-4 text-center">
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

      <div class="pt-10 mb-0 flex justify-center">
        {data && (
          <div class="rounded-lg shadow-md p-2">
            <h1 class="text-gray-200 rounded-lg bg-slate-700 font-bold flex justify-center mb-1">
              Users Table
            </h1>
            <table class="table-auto">
              <thead>
                <tr>
                  <th class="text-gray-200 pr-4 text-center">Name</th>
                  <th class="text-gray-200 pr-4 text-center">Username</th>
                  <th class="text-gray-200 pr-4 text-center">Age</th>
                  <th class="text-gray-200 pr-4 text-center">Nationality</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <tr key={user.id}>
                    <td class=" text-sm text-ellipsis  text-slate-900 pr-4 text-center">
                      {user.name}
                    </td>
                    <td class=" text-sm text-ellipsis  text-slate-900 pr-4 text-center">
                      {user.username}
                    </td>
                    <td class=" text-sm text-ellipsis  text-slate-900 pr-4 text-center">
                      {user.age}
                    </td>
                    <td class=" text-sm text-ellipsis  text-slate-900 pr-4 text-center">
                      {user.nationality}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div class="pt-10 mb-0 flex justify-center">
        <div class="rounded-lg shadow-md p-2">
          <h1 class="text-gray-200 rounded-lg bg-slate-700 font-bold flex justify-center mb-1">
            Movies Table
          </h1>
          <table class="table-auto">
            <thead>
              <tr>
                <th class="text-gray-200 pr-4 text-center">Movies</th>
              </tr>
            </thead>
            <tbody>
              {dataMovie &&
                dataMovie.movies.map((movie) => (
                  <tr key={movie.id}>
                    <td class="text-sm  text-slate-900 text-ellipsis pr-4 text-center">
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
