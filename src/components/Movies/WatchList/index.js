import { useDispatch, useSelector } from "react-redux";
import { BASE_IMG_URL } from "../../../common/apis/common";
import {
  getMovies,
  removeFromWatchlist,
} from "../../../features/movies/moviesSlice";
import ProgressiveImage from "../../UI/ProgressiveImage";

import "./style.scss";

const WatchList = () => {
  const { watchlist } = useSelector(getMovies);
  const dispatch = useDispatch();

  if (watchlist.length) {
    return (
      <div className="watchlist-container">
        {watchlist.map((movie) => (
          <div key={movie.id} className="watchlist-posters">
            <ProgressiveImage
              src={BASE_IMG_URL + movie.backdrop_path}
              alt={movie.title}
              height="188"
              width="334"
            />

            <div className="watchlist-info">
              <div className="watchlist-title">{movie.title}</div>
              <div className="watchlist-tagline ellipsis">
                {movie.tagline || movie.overview}
              </div>
              <button
                className="remove-btn"
                onClick={() => dispatch(removeFromWatchlist(movie))}
              >
                Remove from watchlist
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="empty-watchlist">
        <h2>your watchlist is empty</h2>
      </div>
    );
  }
};

export default WatchList;
