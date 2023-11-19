import { TypeSearchSectionProps } from "../types/types";
import { useState } from "react";

const SearchSection = ({ onSearch }: TypeSearchSectionProps) => {
  const [search, setSearch] = useState<string>(
    localStorage.getItem("search") || "",
  );

  return (
    <section>
      <h3 className="mb-3 font-semibold">
        Type here name of the movie, you want to find
      </h3>
      <div className="flex items-center">
        <input
          className="rounded-xl p-2 border-2 border-violet-300 focus:border-violet-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-violet-700 rounded-xl ml-10 text-white font-semibold text-xl transition-all hover:bg-violet-900"
          onClick={() => onSearch(search)}
        >
          search
        </button>
      </div>
    </section>
  );
};

export default SearchSection;
