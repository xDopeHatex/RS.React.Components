import { useState } from "react";
import { useLazySearchMoviesQuery } from "../../src/store/movies/movies.api";

import DataSection from "./DataSection";
import SearchSection from "./SearchSection";
import Paggination from "./Paggination";
import { useParams, useNavigate, Outlet } from "react-router-dom";

import TestErrorBoundaryButton from "./TestErrorBoundaryButton";
import { useActions } from "../../src/hooks/actions";
import { useAppSelector } from "../../src/hooks/redux";

export type MyParams = {
  search: string;
  id: string;
  currentPage: string;
};

const App = () => {
  const [fetchData] = useLazySearchMoviesQuery();
  const { search: searchValue } = useAppSelector((state) => state.movies);
  const { addSearch, placeDataBase, setLoading } = useActions();

  const navigate = useNavigate();
  const { currentPage } = useParams<keyof MyParams>() as MyParams;
  const [allPages, setAllPages] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(+currentPage);

  const searchPageHandler = async (page = 1) => {
    setLoading(true);
    console.log("page", page);
    setCurPage(page);
    navigate(`/search/${searchValue}/currentPage/${page}`);

    const keyWord = searchValue;
    const pageNumber = page.toString();

    const res = await fetchData({ keyWord, pageNumber });

    if (res?.data?.results) {
      await placeDataBase(await res.data.results!);
    }

    if (res?.data?.total_pages) {
      await setAllPages(await res.data.total_pages!);
      console.log("allp", await res.data.total_pages!);
    }
    setLoading(false);
  };

  const searchHandler = async (search = searchValue) => {
    setLoading(true);
    localStorage.setItem("search", search);

    console.log("search", search);
    setCurPage(1);
    navigate(`/search/${search}/currentPage/1`);
    addSearch(search);
    const keyWord = search;
    const pageNumber = "1";

    const res = await fetchData({ keyWord, pageNumber });

    if (res?.data?.results) {
      await placeDataBase(await res.data.results!);
    }

    if (res?.data?.total_pages) {
      await setAllPages(await res.data.total_pages!);
      console.log("allp", await res.data.total_pages!);
    }

    setLoading(false);

    // fetchData(searchValue, page);
  };

  const handleDetails = (idCur: number) => {
    navigate(
      `/search/${searchValue}/currentPage/${currentPage}/details/${idCur}`,
    );
  };

  return (
    <div className="flex" data-testid="app">
      <div className="grow-1 gap-y-10 flex-col flex">
        <SearchSection onSearch={searchHandler} />
        <DataSection handleDetails={handleDetails} setAllPages={setAllPages} />

        <Paggination
          allPages={allPages}
          currentPage={curPage}
          setPage={setCurPage}
          changePageHandler={searchPageHandler}
        />
        <TestErrorBoundaryButton />
      </div>

      <Outlet />
    </div>
  );
};

export default App;
