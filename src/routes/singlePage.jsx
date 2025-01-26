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

  useEffect(() => {
    const fetchAnimeData = async (id) => {
      try {
        const response = await fetch(`/anime_data?sid=${id}`);
        if (!response.ok) {
          throw new Error("So'rov muvaffaqiyatsiz bo'ldi");
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setAnimeData(data);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Yuklanmoqda...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Xatolik: {error}</div>;
  }

  if (!animeData) {
    return <div className="text-center">Ma'lumot topilmadi</div>;
  }

  return (
    <div>
      <Wrapper>
        <div className="w-full md:h-screen xl:h-[600px] mt-[40px]">
          <iframe
            id="kodik-player"
            title="Video player frame"
            src={`https://animetka.ru${animeData.link}`}
            frameborder="0"
            allowfullscreen=""
            allow="autoplay *; fullscreen *"
            className="w-full h-full rounded-[20px]"
          ></iframe>
        </div>

        <div className="flex mt-[20px] items-start gap-[10px]">
          <div className="w-[40%] h-[550px]">
            <img
              src={animeData.poster_url || animeData.anime_poster_url}
              alt={animeData.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="w-full">
            <div className="rating flex items-center justify-between w-full">
              <div className="flex-col mt-4">
                <div className="flex items-center gap-2">
                  <img src="/star.png" className="w-[30px]" />
                  <h4 className="font-medium text-[20px]">
                    {animeData.shikimori_rating}
                  </h4>
                </div>
                <span className="text-[#808080] text-[12px]">
                  на основании {animeData.shikimori_votes} оценок
                </span>
              </div>

              <p className="bg-red-500 w-[40px] h-[40px] flex justify-center items-center rounded-[50%]">
                {animeData.minimal_age}+
              </p>
            </div>
            <h1 className="text-2xl font-bold mt-3">⛩️ {animeData.title}</h1>
            <span className="text-[#808080] text-[12px]">
              {animeData.title_en}
            </span>
            <ul>
              <li>📺{animeData.anime_kind && "ТВ-спешиал"}</li>
              <li>📀 {animeData.all_status && "Завершён"}</li>
              <li>📼{animeData.year}</li>
              <li>🕑{animeData.duration} мин</li>
            </ul>
          </div>
        </div>
        <div>
          <h1 className="text-center font-[700] text-[25px] mt-[20px]">
            Описание
          </h1>
          <p className="text-sm">{animeData.description}</p>
        </div>
      </Wrapper>
    </div>
  );
}

export default SinglePage;
