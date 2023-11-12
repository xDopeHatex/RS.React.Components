import { useState, useEffect } from "react";

import { URL, KEY } from "../constants/constants";

import DataSection from "./DataSection";
import SearchSection from "./SearchSection";
import Paggination from "./Paggination";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useItemsUpdate } from "../store/StoreContext";

import { TypeDataList } from "../types/types";
import { useSearch } from "../store/StoreContext";

export type MyParams = {
  search: string;
  id: string;
  currentPage: string;
};

const App = () => {
  let option = 20;
  const updateData = useItemsUpdate();
  const location = useLocation();
  const navigate = useNavigate();
  const { search, currentPage, id } = useParams<keyof MyParams>() as MyParams;

  const [allPages, setAllPages] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(+currentPage);
  const [selectOption, setSelectOption] = useState<number>(20);
  const searchValue = useSearch();

  const [isFetchingData, setisFetchingData] = useState(false);

  const fetchData = (keyWord: string = "", pageNumber = 1) => {
    let finalPageNumber: number;
    if (option === 10) {
      finalPageNumber = pageNumber / 2;
    } else {
      finalPageNumber = pageNumber;
    }
    setisFetchingData(true);

    let url;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${KEY}`,
      },
    };

    if (keyWord) {
      url = `${URL}/search/movie?query=${keyWord}&include_adult=false&language=en-US&page=${finalPageNumber}`;
    } else {
      url = `${URL}/search/movie&query=a&include_adult=false&language=en-US&page=${finalPageNumber}`;
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

          console.log(selectOption);
          if (option === 10) {
            setAllPages(result.total_pages * 2);
          } else {
            setAllPages(result.total_pages);
          }

          setisFetchingData(false);
        },
      )
      .catch((error) => {
        setisFetchingData(false);
      });
  };

  const searchPageHandler = (page = 1) => {
    console.log("CURENT", page, searchValue);
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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    option = +value;
    setSelectOption(+value);

    setCurPage(1);
    navigate(`/search/${searchValue}/currentPage/1`);
    fetchData(searchValue, 1);
  };

  return (
    <div className="flex">
      <div className="grow-1 gap-y-10 flex-col flex">
        <SearchSection onSearch={searchPageHandler} />
        <DataSection
          curPage={curPage}
          option={selectOption}
          isLoading={isFetchingData}
          handleDetails={handleDetails}
        />
        <label htmlFor="page-select">Choose a number of notes per page</label>

        <select
          name="pages"
          id="page-select"
          value={selectOption}
          onChange={handleSelectChange}
        >
          <option value="">--Please choose an option--</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <Paggination
          allPages={allPages}
          currentPage={curPage}
          setPage={setCurPage}
          changePageHandler={searchPageHandler}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default App;
