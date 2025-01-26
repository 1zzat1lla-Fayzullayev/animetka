/* eslint-disable react/display-name */
import React from "react";
import RandomAnime from "../components/randomAnime";
import TopAnime from "../components/topAnime";
import TopFilm from "../components/topFilm";

const Home = React.memo(() => {
  return (
    <>
      <RandomAnime />
      <TopAnime />
      <TopFilm />
    </>
  );
});

export default Home;
