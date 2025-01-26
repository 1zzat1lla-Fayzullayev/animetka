/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SinglePage() {
  const { id } = useParams();
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

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

          if (data.skipdata && data.skipdata.length > 0) {
            const firstEpisode = data.skipdata[0];
            setSelectedEpisode(firstEpisode.episode);
            setVideoUrl(firstEpisode.skips?.hd || firstEpisode.skips?.sd || "");
          }
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

  const handleEpisodeChange = (episode) => {
    const episodeData = animeData.skipdata.find((e) => e.episode === episode);
    setSelectedEpisode(episode);
    setVideoUrl(episodeData?.skips?.hd || episodeData?.skips?.sd || null);
  };

  const handleVideoPlay = () => {
    setVideoPlaying(true);
  };

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
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">{animeData.title}</h1>
      <img
        src={animeData.poster_url || animeData.anime_poster_url}
        alt={animeData.title}
        className="w-[300px] rounded-lg my-4 mx-auto"
      />

      <p className="text-lg leading-relaxed mb-4">
        {animeData.anime_description || "Tavsif mavjud emas."}
      </p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Ma'lumotlar:</h2>
        <ul>
          <li>Yili: {animeData.year}</li>
          <li>Janrlar: {animeData.genres?.join(", ")}</li>
          <li>Studio: {animeData.anime_studios?.join(", ")}</li>
          <li>Rejissor: {animeData.directors?.join(", ")}</li>
        </ul>
      </div>

      {animeData.skipdata && animeData.skipdata.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Qismlar:</h2>
          <div className="flex space-x-2 overflow-x-auto">
            {animeData.skipdata.map((episodeData, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg ${
                  selectedEpisode === episodeData.episode
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleEpisodeChange(episodeData.episode)}
              >
                {episodeData.episode}-qism
              </button>
            ))}
          </div>

          {videoUrl ? (
            <div className="mt-4">
              <iframe
                src={videoUrl}
                controls
                className="w-[400px] rounded-lg"
                onPlay={handleVideoPlay}
              />
            </div>
          ) : (
            <div className="text-center text-red-500 mt-4">
              Video mavjud emas
            </div>
          )}
        </div>
      )}

      {/* <div className={`play_background ${videoPlaying ? "hidden" : "block"}`}>
        <div className="relative w-full">
          <img
            src={animeData.screenshots[0]}
            className={`absolute top-0 left-0 w-[400px]  transition-opacity duration-1000 ${
              videoPlaying ? "opacity-0" : "opacity-100"
            }`}
            alt="Screenshot 1"
          />
          <img
            src={animeData.screenshots[1]}
            className={`absolute top-0 left-0 w-[400px]  transition-opacity duration-1000 ${
              videoPlaying ? "opacity-0" : "opacity-100"
            }`}
            alt="Screenshot 2"
          />
        </div>

        <button>Play</button>
      </div> */}
    </div>
  );
}

export default SinglePage;
