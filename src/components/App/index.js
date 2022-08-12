import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Header from "../UI/Header";
import Home from "../Home";

const WatchList = lazy(() => import("../Movies/WatchList"));
const MovieDetail = lazy(() => import("../Movies/MovieDetail"));

import "./style.scss";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container" data-testid="container-element">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="watchlist"
            element={
              <Suspense fallback={<h2>loading watchlist ...</h2>}>
                <WatchList />
              </Suspense>
            }
          />
          <Route
            path="movie/:movieId"
            element={
              <Suspense fallback={<h2>loading movie detail ...</h2>}>
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
