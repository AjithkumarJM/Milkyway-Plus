import { useNavigate } from "react-router-dom";

import { BASE_IMG_URL } from "../../../common/apis/common";
import Image from "../../UI/Image";

import "./style.scss";

const Posters = (props) => {
  const { title, data, isLargePoster = false } = props;
  const { movies, status, error } = data;
  const navigate = useNavigate();

  if (status === "loading") {
    return <h2>Loading {title} movies ...</h2>;
  } else if (status === "failed") {
    return <h3>{error}</h3>;
  } else if (status === "succeeded") {
    return (
      <div className="slider">
        <h2>{title}</h2>

        <div className="posters">
          {movies.map(({ name, id, poster_path, backdrop_path }) => {
            return (
              <Image
                key={id}
                onClick={() => navigate(`movie/${id}`)}
                className={`poster ${isLargePoster && "large-poster"}`}
                src={`${BASE_IMG_URL}${
                  isLargePoster ? poster_path : backdrop_path
                }`}
                alt={name}
              />
            );
          })}
        </div>
      </div>
    );
  }
};

export default Posters;
