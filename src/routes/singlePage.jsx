/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../layout/wrapper";

function SinglePage() {
  const { id } = useParams();
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [timeLeft, setTimeLeft] = useState(20); 

  useEffect(() => {
    const fetchAnimeData = async (id) => {
      try {
        const response = await fetch(
          id.includes("movie") ? `https://kodikapi.com/list?token=9ff26e8818a90b10c0acbe923f701971&types=anime&with_episodes=true&with_material_data=true` : `https://kodikapi.com/list?token=9ff26e8818a90b10c0acbe923f701971&types=anime-serial&with_episodes=true&with_material_data=true`
        );
        if (!response.ok) {
          throw new Error("So'rov muvaffaqiyatsiz bo'ldi");
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          
          setAnimeData(data.results.filter((item) => item.id == id)[0]);
        } else {
          throw new Error("Xatolik: JSON formatida ma'lumot olinmadi.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData(id);

    

  }, [id]);


  useEffect(() => {
    if (timeLeft > 0) {
      
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); 
    } else {
      
      
      handleView();
    }
  }, [timeLeft]);


  const handleView = () => {
   
    const existingHistory = JSON.parse(localStorage.getItem("viewHistory")) || [];

   const photoUrl =  animeData?.material_data?.poster_url || animeData?.material_data?.anime_poster_url
   const title = animeData?.material_data?.title
   const mediaId = id

    
    const newVideo = { mediaId, photoUrl, title };

    
    const isDuplicate = existingHistory.some((item) => item.mediaId === mediaId);

    
    if (!isDuplicate) {
      const updatedHistory = [newVideo, ...existingHistory]; // Add the new video to the start
      localStorage.setItem("viewHistory", JSON.stringify(updatedHistory));
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Загрузка...
      </div>
    );
  }

  return (
    <div>
      <Wrapper>
        <div 
 className="w-full  h-[300px] md:h-[600px] mt-[40px]">
          {/* <iframe
            id="kodik-player"
            title="Video player frame"
            src={`https://animetka.ru${animeData.link}`}
            frameborder="0"
            allowfullscreen=""
            allow="autoplay *; fullscreen *"
            className="w-full h-full rounded-[20px]"
          ></iframe> */}

          <iframe
          

            src={animeData.link}
            width="610"
            height="370"
            frameborder="0"
            allowfullscreen
            allow="autoplay *; fullscreen *"

            className="w-full h-full rounded-[20px]"
          ></iframe>
        </div>

        {/* {
          animeData.link.includes('/serial') &&  <div className="pler flex flex-row items-center gap-2 mt-3">
          <h3 className="text-sm font-bold">Плеер:</h3>

          <select name="serial" id="serial" className="px-2 outline-none bg-[#171717]">
            <option value="1">1 серия</option>
            <option value="2">2 серия</option>
            <option value="3">3 серия</option>
            <option value="4">4 серия</option>
          </select>
        </div>
        } */}

        <div className="flex mt-[20px] items-start gap-[10px]">
          <div className="w-[40%] h-[550px] hidden sm:block">
            <img
              src={animeData.material_data.poster_url || animeData.material_data.anime_poster_url}
              alt={animeData.material_data.title_en}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="w-full">
            <div className="rating flex items-center justify-between w-full">
              <div className="flex-col mt-4">
                <div className="flex items-center gap-2">
                  <img src="/star.png" className="w-[30px]" />
                  <h4 className="font-medium text-[20px]">
                    {animeData.material_data.shikimori_rating}
                  </h4>
                </div>
                <span className="text-[#808080] text-[12px]">
                  на основании {animeData.material_data.shikimori_votes} оценок
                </span>
              </div>

              <p className="bg-red-500 w-[40px] h-[40px] flex justify-center items-center rounded-[50%]">
                {animeData.material_data.minimal_age}+
              </p>
            </div>
            <h1 className="text-2xl font-bold mt-3">⛩️ {animeData.title}</h1>
            <span className="text-[#808080] text-[12px]">
              {animeData.material_data.title_en}
            </span>
            <ul>
              <li>📺{animeData.material_data.anime_kind && "ТВ-спешиал"}</li>
              <li>📀 {animeData.material_data.all_status == "ongoing" ?  "Незаконченный" :"Завершён"}</li>
              <li>📼{animeData.year}</li>
              <li>🕑{animeData.material_data.duration} мин</li>
            </ul>
          </div>
        </div>
        {animeData.material_data.description && (
          <div>
            <h1 className="text-center font-[700] text-[25px] mt-[20px]">
              Описание
            </h1>
            <p className="text-sm mb-3">{animeData.material_data.description}</p>
          </div>
        )}
      </Wrapper>
    </div>
  );
}

export default SinglePage;
