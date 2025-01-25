import Wrapper from "../layout/wrapper"
import TopFilmCard from "./topFilmCard"

function TopFilm() {
  return (
    <>
    <Wrapper>
        <h1 className="text-center text-[30px] font-[700] my-3">Топ фильмов</h1>
       <TopFilmCard />
  
    </Wrapper>
    </>
  )
}

export default TopFilm