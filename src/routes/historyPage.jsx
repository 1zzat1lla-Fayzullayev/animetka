import { useEffect, useState } from "react";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("viewHistory")) || [];

    console.log(storedHistory)
    setHistory(storedHistory);
  }, []);

  return (
    <div className="history mt-4 mx-2">
      <h2 className="text-lg md:text-xl font-medium font-mono">История</h2>

      <div className="cards-content mx-2 mt-4 flex flex-row flex-wrap gap-4">
        {history.map((item, index) => (
          <div
            onClick={() => window.open(`/media/${item.mediaId}, "_current`)}
            key={index}
            className="flex flex-col max-w-[250px] md:max-w-[300px] cursor-pointer gap-1 mb-10 transition-all ease-in md:hover:scale-105 mt-2"
          >
            <img
              src={item.photoUrl}
              alt={item.title}
              className="w-full object-cover rounded-[20px] h-[300px]"
            />
            <div className="text-center line-clamp-2">{item.title}</div>
          </div>
        ))}

        {(history.length == 0) &&
        <p className="text-lg font-bold text-center w-full">История нету.</p>}
      </div>
    </div>
  );
};

export default HistoryPage;
