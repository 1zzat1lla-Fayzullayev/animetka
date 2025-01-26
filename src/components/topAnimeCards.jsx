import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { recomendationAnime } from "../data/recomendationAnime";
import { useEffect, useMemo, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

function TopAnimeCards() {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

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
    return recomendationAnime.map((item) => ({
      ...item,
      optimizedImageUrl: `${item.image_url}?w=400&h=300&fit=crop`,
    }));
  }, [recomendationAnime]);

  useEffect(() => {
    optimizedImages.forEach((item) => {
      const img = new Image();
      img.src = item.optimizedImageUrl;
    });
  }, [optimizedImages]);

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
        {optimizedImages.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="flex flex-col gap-1 mb-10 transition-all ease-in md:hover:scale-105 mt-2"
              onClick={() => handleCardClick(item.id)}
            >
              <img
                src={item.optimizedImageUrl}
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
}

export default TopAnimeCards;
