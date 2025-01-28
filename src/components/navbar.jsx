import { Link } from "react-router-dom";
import Wrapper from "../layout/wrapper";
import { useEffect, useState } from "react";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [api1Response, api2Response] = await Promise.all([
          fetch(
            "https://kodikapi.com/list?token=9ff26e8818a90b10c0acbe923f701971&types=anime-serial&with_episodes=true&with_material_data=true"
          ),
          fetch(
            "https://kodikapi.com/list?token=9ff26e8818a90b10c0acbe923f701971&types=anime&with_episodes=true&with_material_data=true"
          ),
        ]);

        if (!api1Response.ok || !api2Response.ok) {
          throw new Error("Failed to fetch data from one or both APIs");
        }

        const api1Data = await api1Response.json();
        const api2Data = await api2Response.json();

        

        const combinedData = [...api1Data.results, ...api2Data.results];
        setData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    const results = data.filter((item) => {
      const queryLower = query.toLowerCase();
      return (
        item.material_data.title_en.toLowerCase().includes(queryLower) ||
        item.material_data.title.toLowerCase().includes(queryLower)
      );
    });

    setFilteredResults(results);

    if(query === ""){
      setFilteredResults([])
    }
  };

  return (
    <nav className="w-full bg-[#14161A] text-white py-4 shadow-md">
      <Wrapper>
        <ul className="flex items-center justify-between w-full flex-wrap gap-4 md:gap-0">
          <div className="flex w-full md:w-auto items-center justify-between gap-6 md:gap-10">
            <li className="text-2xl font-bold cursor-pointer hover:text-gray-400 text-start">
              <Link to={"/"}>AniMetka</Link>
            </li>
            <div className="flex items-center gap-8">
              <li className="cursor-pointer hover:text-gray-400">
                <Link to={"/"}>Главной </Link>
              </li>
              <li className="cursor-pointer hover:text-gray-400">
              <Link to={"/history"}>История</Link></li>
            </div>
          </div>

          <div className="flex relative items-center gap-3 max-w-[250px] w-full md:w-auto lg:w-full">
            <input
              type="text"
              placeholder="Поиск аниме"
              className="w-full md:w-auto lg:w-full bg-[#1F2023] px-4 py-2 rounded-md outline-none text-sm text-white placeholder-gray-500"
              value={searchTerm}
              onChange={handleSearch}
            />

            {filteredResults.length > 0 && (
              <div className="bg-[#2A2B2E] z-20 top-10 right-0 h-dvh overflow-auto absolute mt-2 rounded-md shadow-lg">
                <ul className="list-none p-2">
                  {filteredResults.map((item, index) => (
                    <li
                      key={index}
                      className="p-2 text-white text-center text-sm hover:bg-[#383A3D] rounded-md cursor-pointer"
                    >
                      <span className="text-center font-bold text-base">
                        ⛩️ {item.title}
                      </span>

                      <span className="capitalize">
                        <br />
                        ⭐️ {item.material_data.shikimori_rating} 🎥 {item.year}{" "}
                        🎞️ {item.material_data.episodes_total} серий
                        <br />
                        🎬{" "}
                        {item?.material_data?.anime_genres?.join(", ") ||
                          item?.material_data?.genres?.join(", ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ul>
      </Wrapper>
    </nav>
  );
}

export default Navbar;
