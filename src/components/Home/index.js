import { lazy, useEffect, Suspense } from "react";
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
      title: "Action & Adventures: 2022",
      data: adventure,
      isLargePoster: true,
    },
    {
      title: "Supernatural TV Sci-fi & Fantasy: 2021",
      data: horror,
      isLargePoster: true,
    },
    {
      title: "Exciting Action Comedies: 2020",
      data: comedy,
      isLargePoster: true,
    },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdventureMovies(actionRoute));
    dispatch(fetchHorrorMovies(horrorRoute));
    dispatch(fetchComedyMovies(comedyRoute));
  }, []);

  const renderPosters = (poster, idx) => {
    let content = "";

    // with post.status can develop a separate components for loader/error state

    content = <Posters {...poster} />;

    return <div key={`${poster.title}-${idx}`}>{content} </div>;
  };

  return <div>{posters.map(renderPosters)}</div>;
};

export default Home;
