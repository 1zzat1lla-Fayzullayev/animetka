import Wrapper from "../layout/wrapper";
import TopAnimeCards from "./topAnimeCards";

function TopAnime() {
  return (
    <>
      <Wrapper>
        <h1 className="text-center text-[30px] font-[700] my-3">Топ аниме</h1>

        <TopAnimeCards />
      </Wrapper>
    </>
  );
}

export default TopAnime;
