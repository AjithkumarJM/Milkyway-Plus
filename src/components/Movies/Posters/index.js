import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { BASE_IMG_URL } from "../../../common/apis/common";
import ProgressiveImage from "../../UI/ProgressiveImage";

import "./style.scss";

const Posters = (props) => {
  const { title, data, isLargePoster } = props;
  const { movies } = data;
  const navigate = useNavigate();

  return (
    <div className="slider">
      <h2>{title}</h2>

      <div className="posters">
        {movies.map(({ title, id, poster_path, backdrop_path }) => {
          return (
            <ProgressiveImage
              key={id}
              onClick={() => navigate(`movie/${id}`)}
              className={`poster ${isLargePoster && "large-poster"}`}
              src={`${BASE_IMG_URL}${
                isLargePoster ? poster_path : backdrop_path
              }`}
              alt={title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(Posters);
