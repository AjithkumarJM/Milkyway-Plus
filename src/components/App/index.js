import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Header from "../UI/Header";
import Home from "../Home";
// import MovieDetail from "../Movies/MovieDetail";

const WatchList = lazy(() => import("../Movies/WatchList"));
const MovieDetail = lazy(() => import("../Movies/MovieDetail"));

import "./style.scss";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="watchlist"
            element={
              <Suspense fallback={<div>fallback component for watchlist</div>}>
                <WatchList />
              </Suspense>
            }
          />
          <Route
            path="movie/:movieId"
            element={
              <Suspense
                fallback={<div>fallback component for Movie Detail</div>}
              >
                <MovieDetail />
              </Suspense>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
