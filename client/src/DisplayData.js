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
    <div>
      <div>
        <input
          text="text"
          placeholder="365 Days"
          onChange={(event) => {
            setMovieSearch(event.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                name: movieSearch,
              },
            });
          }}
        >
          Get Data
        </button>
        <div>
          {movieSearchData && (
            <div>
              <p>Movie Name: {movieSearchData.movie.name}</p>
              <p>Publish Year: {movieSearchData.movie.yearPublish}</p>{" "}
            </div>
          )}
          {movieError && <h1>Error fetching data</h1>}
        </div>
      </div>

      {data &&
        data.users.map((users) => {
          return (
            <div>
              <p>Name: {users.name}</p>
              <p>Username: {users.username}</p>
              <p>Age: {users.age}</p>
              <p>Nationality: {users.nationality}</p>
            </div>
          );
        })}

      {dataMovie &&
        dataMovie.movies.map((movie) => {
          return <p>Movies Name: {movie.name}</p>;
        })}
    </div>
  );
}

export default DisplayData;
