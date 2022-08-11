import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../common/apis/apiInstance";
import { API_KEY } from "../../common/apis/common";

const fetchMovies = async (url) => {
  const response = await api.get(url);
  return response.data;
};

const fetchMoviesBy = async ({ type, id }) => {
  const url =
    type === "credits"
      ? `/movie/${id}/credits?api_key=${API_KEY}`
      : `/movie/${id}?api_key=${API_KEY}`;

  const response = await api.get(url);

  return response.data;
};

const fetchAdventureMovies = createAsyncThunk(
  "movies/fetchAdventureMovies",
  fetchMovies
);

const fetchComedyMovies = createAsyncThunk(
  "movies/fetchComedyMovies",
  fetchMovies
);

const fetchHorrorMovies = createAsyncThunk(
  "movies/fetchHorrorMovies",
  fetchMovies
);

const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  fetchMoviesBy
);

const fetchMovieCredits = createAsyncThunk(
  "movies/fetchMovieCast",
  fetchMoviesBy
);

export {
  fetchAdventureMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchMovieDetail,
  fetchMovieCredits,
};
