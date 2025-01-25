import Wrapper from "../layout/wrapper";

function Navbar() {
  return (
    <nav className="w-full bg-[#14161A] text-white py-4 shadow-md">
      <Wrapper>
        <ul className="flex items-center justify-between w-full flex-wrap gap-4 md:gap-0">
          <div className="flex items-center gap-6 md:gap-10">
            <li className="text-2xl font-bold cursor-pointer hover:text-gray-400 text-start">
              AniMetka
            </li>
            <div className="hidden md:flex items-center gap-8">
              <li className="cursor-pointer hover:text-gray-400">Home</li>
              <li className="cursor-pointer hover:text-gray-400">Time</li>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Поиск аниме"
              className="w-full md:w-auto bg-[#1F2023] px-4 py-2 rounded-md outline-none text-sm text-white placeholder-gray-500"
            />
          </div>
        </ul>

        <div className="flex md:hidden mt-4 gap-4 list-none">
          <li className="cursor-pointer hover:text-gray-400">Home</li>
          <li className="cursor-pointer hover:text-gray-400">Time</li>
        </div>
      </Wrapper>
    </nav>
  );
}

export default Navbar;
