import { useSelector } from "react-redux";

import { BASE_IMG_URL } from "../../../common/apis/common";
import { getMovies } from "../../../features/movies/moviesSlice";
import ProgressiveImage from "../../UI/ProgressiveImage";

import "./style.scss";

const Cast = () => {
  const { credits } = useSelector(getMovies);
  const { data, status, error } = credits;

  const renderCast = (cast) => {
    return (
      <div className="cast-poster" key={cast.id}>
        <ProgressiveImage src={BASE_IMG_URL + cast.profile_path} alt={cast.name} />
        <h4>{cast.character}</h4>
        <p>{cast.name}</p>
      </div>
    );
  };

  return (
    <div
      className="cast-container"
      style={{
        width:
          (data.cast && data.cast.length < 10)
            ? `calc(167px * ${data.cast.length + 1})`
            : "auto",
      }}
    >
      {status === "loading" && <h2>Loading ...</h2>}
      {status === "error" && <h2>{error}</h2>}
      {data.cast &&
        status === "succeeded" &&
        data.cast.map((cast) => renderCast(cast))}
    </div>
  );
};

export default Cast;
