import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { topFilm } from "../data/topFilm";
import { useRef, useState } from "react";

function TopFilmCard() {
  const swiperRef = useRef(null);

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
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
        modules={[Navigation, Autoplay]}
        onSlideChange={handleSlideChange} 
        breakpoints={{
          320: {
            slidesPerView: 1,
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
        {topFilm.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-1 mb-10">
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover rounded-[20px] h-[300px]"
              />
              <div className="text-center">{item.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TopFilmCard;
