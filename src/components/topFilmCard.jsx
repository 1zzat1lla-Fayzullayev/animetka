import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TopFilmCard() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const [topFilms, setTopFilms] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, 30);
    };

    try {
      const response = await fetch(
        `https://kodikapi.com/list?token=9ff26e8818a90b10c0acbe923f701971&types=anime&with_episodes=true&with_material_data=true`
      );
      if (!response.ok) {
        throw new Error("Ma'lumotni yuklashda xatolik yuz berdi.");
      }
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        
        const selectedAnime = shuffleArray(data.results);
        setTopFilms(selectedAnime);
      } else {
        throw new Error("Ma'lumot topilmadi.");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      console.log(false);
    }
  };


  const filterUnique = (data) => {
    const seen = new Set();
    return data.filter((item) => {
      const isDuplicate = seen.has(item.title);
      seen.add(item.title);
      return !isDuplicate;
    });
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
      {topFilms.length !== 0 && (
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
      {topFilms.length !== 0 && (
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
        {filterUnique(topFilms).map((item, index) => (
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

        {topFilms.length === 0 && (
          <h3 className="font-mono text-xl text-center">Loading ...</h3>
        )}
      </Swiper>
    </div>
  );
}

export default TopFilmCard;
