import { TypeSearchSectionProps } from "../types/types";
import { useMemo, useCallback, useEffect } from "react";

import { useSearchUpdate, useSearch } from "../store/StoreContext";

const SearchSection = ({ onSearch }: TypeSearchSectionProps) => {
  const searchValue = useSearch();

  const setSearchValue = useSearchUpdate();

  const initialValue = "a";

  const search = useMemo(() => {
    return localStorage.getItem("search") || initialValue;
  }, [initialValue]);

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  return (
    <section>
      <h3 className="mb-3 font-semibold">
        Type here name of the movie, you want to find
      </h3>
      <div className="flex items-center">
        <input
          className="rounded-xl p-2 border-2 border-violet-300 focus:border-violet-700"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-violet-700 rounded-xl ml-10 text-white font-semibold text-xl transition-all hover:bg-violet-900"
          onClick={() => onSearch()}
        >
          search
        </button>
      </div>
    </section>
  );
};

export default SearchSection;
