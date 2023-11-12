import { useState, useEffect } from "react";

import { URL, KEY } from "../constants/constants";

import DataSection from "./DataSection";
import SearchSection from "./SearchSection";
import Paggination from "./Paggination";
import { useParams, useNavigate, Outlet } from "react-router-dom";

import { useItemsUpdate } from "../store/StoreContext";

import { TypeDataList } from "../types/types";
import { useSearch } from "../store/StoreContext";
import TestErrorBoundaryButton from "./TestErrorBoundaryButton";

export type MyParams = {
  search: string;
  id: string;
  currentPage: string;
};

const App = () => {
  const updateData = useItemsUpdate();
  const navigate = useNavigate();
  const { search, currentPage } = useParams<keyof MyParams>() as MyParams;
  const [allPages, setAllPages] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(+currentPage);
  const searchValue = useSearch();
  const [isFetchingData, setIsFetchingData] = useState(false);

  const fetchData = (keyWord: string = "", pageNumber = 1) => {
    setIsFetchingData(true);

    let url;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${KEY}`,
      },
    };

    if (keyWord) {
      url = `${URL}/search/movie?query=${keyWord}&include_adult=false&language=en-US&page=${pageNumber}`;
    } else {
      url = `${URL}/search/movie&query=a&include_adult=false&language=en-US&page=${pageNumber}`;
    }

    fetch(url, options)
      .then((response) => response.json())
      .then(
        (result: {
          results: TypeDataList;
          message: string;
          total_pages: number;
        }) => {
          if (result.message) {
            alert(
              `SORRY, but you clicked a lot! so server wnat you to wait a few minutes and try again${result.message}`,
            );
          }
          updateData(result.results);

          setAllPages(result.total_pages);
        },
      )
      .catch((error) => {})
      .finally(() => {
        setIsFetchingData(false);
      });
  };

  const searchPageHandler = (page = 1) => {
    localStorage.setItem("search", searchValue);
    setCurPage(page);
    navigate(`/search/${searchValue}/currentPage/${page}`);
    fetchData(searchValue, page);
  };

  useEffect(() => {
    fetchData(search, curPage);
  }, []);

  const handleDetails = (idCur: number) => {
    navigate(
      `/search/${searchValue}/currentPage/${currentPage}/details/${idCur}`,
    );
  };

  return (
    <div className="flex" data-testid="app">
      <div className="grow-1 gap-y-10 flex-col flex">
        <SearchSection onSearch={searchPageHandler} />
        <DataSection isLoading={isFetchingData} handleDetails={handleDetails} />

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
