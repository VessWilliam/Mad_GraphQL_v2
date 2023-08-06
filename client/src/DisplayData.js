import React, { useState } from "react";
import { useLazyQuery, useQuery, gql } from "@apollo/client";

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

  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: dataMovie } = useQuery(QUERY_ALL_MOVIE);
  const [fetchMovie, { data: movieSearchData, error: movieError }] =
    useLazyQuery(QUERY_MOVIE);

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
        <div class="rounded-lg shadow-md p-4 mb-4">
          <input
            class="rounded-sm pr-3"
            type="text"
            placeholder="365 Days"
            onChange={(event) => {
              setMovieSearch(event.target.value);
            }}
          />
          <button
            class="rounded-lg pl-3 pr-3 ml-3 bg-amber-200"
            onClick={() => {
              fetchMovie({
                variables: {
                  name: movieSearch,
                },
              });
            }}
          >
            <span class=" text-center justify-items-center">Get Data</span>
          </button>

          {movieSearchData && (
            <table class="table-auto">
              <thead>
                <tr>
                  <th class="pr-4 text-center">Movie</th>
                  <th class="pr-4 text-center">Publish</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="pr-4 text-center">{movieSearchData.movie.name}</td>
                  <td class="pr-4 text-center">
                    {movieSearchData.movie.yearPublish}
                  </td>
                </tr>
              </tbody>
            </table>
          )}

          {movieError && <h1>Error fetching movie data</h1>}
        </div>
      </div>

      <div class="pt-10 mb-0 flex justify-center">
        {data && (
          <div class="rounded-lg shadow-md p-4">
            <table class="table-auto">
              <thead>
                <tr>
                  <th class="pr-4 text-center">Name</th>
                  <th class="pr-4 text-center">Username</th>
                  <th class="pr-4 text-center">Age</th>
                  <th class="pr-4 text-center">Nationality</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <tr key={user.id}>
                    <td class="pr-4 text-center">{user.name}</td>
                    <td class="pr-4 text-center">{user.username}</td>
                    <td class="pr-4 text-center">{user.age}</td>
                    <td class="pr-4 text-center">{user.nationality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div class="pt-10 mb-0 flex justify-center">
        <div class="rounded-lg shadow-md p-4">
          <table class="table-auto">
            <thead>
              <tr>
                <th class="pr-4 text-center">Movies</th>
              </tr>
            </thead>
            <tbody>
              {dataMovie &&
                dataMovie.movies.map((movie) => (
                  <tr key={movie.id}>
                    <td class="pr-4 text-center">{movie.name}</td>
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
