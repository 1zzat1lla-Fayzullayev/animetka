import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import { useEffect,  useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

function TopAnimeCards() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [topAnime, setGopAnime] = useState([]);

   useEffect(() => {
      fetchData();
    }, []);

  const fetchData = async () => {
    const shuffleArray = (data,topCount = 18) => {
      const sortedData = [...data].sort((a, b) => {
        const ratingA = a.material_data?.kinopoisk_rating || a.material_data?.imdb_rating || 0;
        const ratingB = b.material_data?.kinopoisk_rating || b.material_data?.imdb_rating || 0;
        return ratingB - ratingA; // Descending order
      });
    
      // Return the top `topCount` items
      return sortedData.slice(0, topCount);
        };

    try {
      const response = await fetch(
        `https://kodikapi.com/list?token=9ff26e8818a90b10c0acbe923f701971&types=anime-serial&with_episodes=true&with_material_data=true`
      );
      if (!response.ok) {
        throw new Error("Ma'lumotni yuklashda xatolik yuz berdi.");
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        console.log("dasdasd", data.results[0].screenshots[0]);
        const selectedAnime = shuffleArray(data.results);
        setGopAnime(selectedAnime);
      } else {
        throw new Error("Ma'lumot topilmadi.");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      console.log(false);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      const isBeginning = swiperInstance.isBeginning;
      const isEnd = swiperInstance.isEnd;

      setIsPrevDisabled(isBeginning);
      setIsNextDisabled(isEnd);
    }
  };


  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="relative">
      {topAnime.length !== 0 && (
        <button
          className={`absolute top-[40%] left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-[10] border-[2px] cursor-pointer border-red-500 ${
            isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrev}
          disabled={isPrevDisabled}
        >
          <img src="/left-arrow.svg" className="w-[35px]" />
        </button>
      )}
      {topAnime.length !== 0 && (
        <button
          className={`absolute top-[40%] right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-[10] border-[2px] cursor-pointer border-red-500 ${
            isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          <img src="/right-arrow.svg" className="w-[35px]" />
        </button>
      )}

      <Swiper
        ref={swiperRef}
        slidesPerView={5}
        spaceBetween={20}
        navigation={{
          prevEl: ".swiper-prev",
          nextEl: ".swiper-next",
        }}
        modules={[Navigation]}
        onSlideChange={handleSlideChange}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        className="mySwiper"
      >
        {topAnime.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="flex flex-col cursor-pointer gap-1 mb-10 transition-all ease-in md:hover:scale-105 mt-2"
              onClick={() => handleCardClick(item.id)}
            >
              <img
                src={item?.material_data?.poster_url}
                alt={item?.material_data?.title_en}
                className="w-full object-cover rounded-[20px] h-[300px]"
              />
              <div className="text-center line-clamp-2">
                {item?.material_data?.title}
              </div>
            </div>
          </SwiperSlide>
        ))}

{topAnime.length === 0 && (
          <h3 className="font-mono text-xl text-center">Loading ...</h3>
        )}
      </Swiper>
    </div>
  );
}

export default TopAnimeCards;
