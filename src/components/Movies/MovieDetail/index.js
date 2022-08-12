import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMovieCredits,
  fetchMovieDetail,
} from "../../../features/movies/actions";
import {
  getMovies,
  addToWatchList,
  removeFromWatchlist,
} from "../../../features/movies/moviesSlice";
import { BASE_IMG_URL } from "../../../common/apis/common";
import { numFormatter } from "../../../common/helpers";
import Chip from "../../UI/Chip";
import Cast from "../MovieCasts";
import ProgressiveImage from "../../UI/ProgressiveImage";
import MovieDetailSubSection from "../MovieDetailSubSection";

import "./style.scss";

const MovieDetail = () => {
  const { movieId } = useParams();
  const { detail, watchlist, cast } = useSelector(getMovies);
  const { data, status, error } = detail;
  const dispatch = useDispatch();
  const isMovieExists = watchlist.some((movie) => movie.id === data.id);

  useEffect(() => {
    dispatch(fetchMovieDetail({ type: "movie", id: movieId }));
    dispatch(fetchMovieCredits({ type: "credits", id: movieId }));
  }, [movieId]);

  const handleWatchListAction = () => {
    if (!isMovieExists) {
      dispatch(addToWatchList(data));
    } else {
      dispatch(removeFromWatchlist(data));
    }
  };

  const renderRatingChip = () => {
    const fixed = Math.pow(10, 1);
    const rating = Math.floor(data.vote_average * 10 * fixed) / fixed;
    let chipType = "primary";

    if (rating < 5) chipType = "error";
    else if (rating > 5 && rating < 7.5) chipType = "warning";
    else if (rating > 7.5) chipType = "success";

    return <Chip type={chipType} name={`${rating}%`} />;
  };

  // Task: Differentiate screen by it's category
  // This is to differentiate the movie detail screen by movie year
  const renderYearChip = () => {
    const movieYear = data.release_date.slice(0, 4);
    let type = "primary";

    switch (movieYear) {
      case "2020":
        type = "dark";
        break;

      case "2021":
        type = "error";
        break;

      case "2022":
        type = "secondary";
        break;

      default:
        break;
    }

    return <Chip type={type} name={movieYear} />;
  };

  if (status === "loading") {
    return <h2>Loading ...</h2>; // adding this as a placeholder for loading, can build separate components for these purpose
  } else if (status === "failed") {
    return <h2>{error}</h2>; // similar to the loading scenario
  } else if (status === "succeeded") {
    return (
      <>
        <div className="movie-detail-container">
          <div className="movie-banner">
            <ProgressiveImage
              height="641"
              width="1139"
              src={BASE_IMG_URL + data.backdrop_path}
              alt={data.original_title}
            />
            <div className="linear-gradient" />
            <div className="banner-title-section">
              <h2>{data.title}</h2>
              <p>{data.tagline}</p>
              {renderYearChip()}
            </div>
          </div>
          <div className="movie-info">
            <div className="movie-description">
              <h2>overview</h2>
              <p>{data.overview}</p>
            </div>

            <MovieDetailSubSection name="Genres:">
              {data.genres &&
                data.genres.map((genre) => (
                  <Chip key={genre.id} type="primary" name={genre.name} />
                ))}
            </MovieDetailSubSection>

            <MovieDetailSubSection name="User Score:">
              <div className="rating-chip">{renderRatingChip()}</div>
            </MovieDetailSubSection>

            <MovieDetailSubSection name="Status:">
              <div className="revenue">{data.status}</div>
            </MovieDetailSubSection>

            <MovieDetailSubSection name="Released:">
              <div className="revenue">{data.release_date}</div>
            </MovieDetailSubSection>

            {data.budget > 0 && (
              <MovieDetailSubSection name="Budget:">
                <div className="revenue">{numFormatter(data.budget)}</div>
              </MovieDetailSubSection>
            )}

            {data.revenue > 0 && (
              <MovieDetailSubSection name="Revenue:">
                <div className="revenue">{numFormatter(data.revenue)}</div>
              </MovieDetailSubSection>
            )}

            <div className="wishlist-btn-section">
              <button
                onClick={handleWatchListAction}
                className={
                  !isMovieExists ? "add-wishlist-btn" : "remove-wishlist-btn"
                }
              >
                {!isMovieExists ? "Add to Wishlist" : "Remove from playlist"}
              </button>
            </div>
          </div>
        </div>

        <div className="movie-detail-footer">
          <h2>cast</h2>
          <Cast />
        </div>
      </>
    );
  }
};

export default MovieDetail;
