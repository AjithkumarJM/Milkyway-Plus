import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAdventureMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchMovieCredits,
  fetchMovieDetail,
} from "./actions";

const getInitialState = () => {
  const watchlist = localStorage.getItem("watchlist");
  const commonState = {
    status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  };

  return {
    adventure: { movies: [], ...commonState },
    comedy: { movies: [], ...commonState },
    horror: { movies: [], ...commonState },
    detail: { data: [], ...commonState },
    watchlist: watchlist ? JSON.parse(watchlist) : [],
    credits: { data: {}, ...commonState },
  };
};

const onPending = (key, state) => {
  state[key].status = "loading";
};

const onFulfilled = (key, state, { payload }) => {
  state[key].status = "succeeded";

  if (key === "detail" || key === "credits") {
    state[key].data = payload;
  } else {
    state[key].movies = payload.results;
  }
};

const onRejected = (key, state, payload) => {
  state[key].status = "failed";
  state[key].error = payload.error.message;
};

const movieSlice = createSlice({
  name: "movies",
  initialState: getInitialState(),
  reducers: {
    addToWatchList(state, actions) {
      state.watchlist = [...state.watchlist, actions.payload];
      localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    },
    removeFromWatchlist(state, actions) {
      if (state.watchlist) {
        const updatedWatchList = state.watchlist.filter(
          (movie) => movie.id !== actions.payload.id
        );

        state.watchlist = updatedWatchList;
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
      }
    },
  },
  extraReducers: {
    [fetchAdventureMovies.pending]: (state, payload) => onPending("adventure", state, payload),
    [fetchAdventureMovies.fulfilled]: (state, payload) => onFulfilled("adventure", state, payload),
    [fetchAdventureMovies.rejected]: (state, payload) => onPending("adventure", state, payload),

    [fetchHorrorMovies.pending]: (state, payload) => onPending("horror", state, payload),
    [fetchHorrorMovies.fulfilled]: (state, payload) => onFulfilled("horror", state, payload),
    [fetchHorrorMovies.rejected]: (state, payload) => onRejected("horror", state, payload),

    [fetchComedyMovies.pending]: (state, payload) => onPending("comedy", state, payload),
    [fetchComedyMovies.fulfilled]: (state, payload) => onFulfilled("comedy", state, payload),
    [fetchComedyMovies.rejected]: (state, payload) => onRejected("comedy", state, payload),

    [fetchMovieDetail.pending]: (state, payload) => onPending("detail", state, payload),
    [fetchMovieDetail.fulfilled]: (state, payload) => onFulfilled("detail", state, payload),
    [fetchMovieDetail.rejected]: (state, payload) => onRejected("detail", state, payload),

    [fetchMovieCredits.pending]: (state, payload) => onPending("credits", state, payload),
    [fetchMovieCredits.fulfilled]: (state, payload) => onFulfilled("credits", state, payload),
    [fetchMovieCredits.rejected]: (state, payload) => onRejected("credits", state, payload),
  },
});

export const { addToWatchList, removeFromWatchlist } = movieSlice.actions;

export const getMovies = (state) => state.movies;

export default movieSlice.reducer;
