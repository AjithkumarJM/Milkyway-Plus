import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchHorrorMovies,
  fetchAdventureMovies,
  fetchComedyMovies,
} from "../../features/movies/actions";
import { getMovies } from "../../features/movies/moviesSlice";
import { requests } from "../../common/apis/common";
import Posters from "../Movies/Posters";

const Home = () => {
  const { adventure, comedy, horror } = useSelector(getMovies);
  const { comedyRoute, actionRoute, horrorRoute } = requests;
  const posters = [
    {
      title: "Action & Adventure Programmes of 2022",
      data: adventure,
      isLargePoster: true,
    },
    {
      title: "Exciting Action Comedies of 2021",
      data: comedy,
      isLargePoster: true,
    },
    {
      title: "Supernatural TV Sci-fi & Fantasy 2020",
      data: horror,
      isLargePoster: true,
    },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdventureMovies(actionRoute));
    dispatch(fetchComedyMovies(comedyRoute));
    dispatch(fetchHorrorMovies(horrorRoute));
  }, []);

  return (
    <div>
      {posters &&
        posters.map((poster, index) => {
          return <Posters key={`${poster.title}-${index}`} {...poster} />;
        })}
    </div>
  );
};

export default Home;
