/* eslint-disable react/display-name */
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { generatedAnime } from "../data/generatedAnime";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const RandomAnimeCard = React.memo(() => {
  const [randomAnime, setRandomAnime] = useState([]);
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, 30);
    };

    const selectedAnime = shuffleArray(generatedAnime);
    setRandomAnime(selectedAnime);
  }, []);

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

  const optimizedImages = useMemo(() => {
    return randomAnime.map((item) => ({
      ...item,
      image: `${item.image}?w=400&h=300&fit=crop`,
    }));
  }, [randomAnime]);

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="relative">
      <button
        className={`absolute top-[40%] left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-[10] border-[2px] cursor-pointer border-red-500 ${
          isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handlePrev}
        disabled={isPrevDisabled}
      >
        <img src="/left-arrow.svg" className="w-[35px]" />
      </button>
      <button
        className={`absolute top-[40%] right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-[10] border-[2px] cursor-pointer border-red-500 ${
          isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        <img src="/right-arrow.svg" className="w-[35px]" />
      </button>

      <Swiper
        ref={swiperRef}
        slidesPerView={5}
        spaceBetween={20}
        onSlideChange={handleSlideChange}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
        modules={[Autoplay]}
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
        {optimizedImages.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="flex flex-col gap-1 mb-10 select-none transition-all ease-in md:hover:scale-105 mt-2"
              onClick={() => handleCardClick(item.id)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full object-cover rounded-[20px] h-[300px]"
              />
              <div className="text-center">{item.name}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default RandomAnimeCard;
