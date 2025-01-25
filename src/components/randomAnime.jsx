import Wrapper from "../layout/wrapper";
import RandomAnimeCard from "./randomAnimeCard";

function RandomAnime() {
  return (
    <>
      <Wrapper>
        <h1 className="text-center text-[30px] font-[700] my-3">Случайные аниме</h1>
        <RandomAnimeCard />
      </Wrapper>
    </>
  );
}

export default RandomAnime;
