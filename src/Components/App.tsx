import { useState, useEffect } from "react";

import { URL, KEY } from "../constants/constants";

import DataSection from "./DataSection";
import SearchSection from "./SearchSection";
import Paggination from "./Paggination";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

export type MyParams = {
  search: string;
  id: string;
  currentPage: string;
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { search, currentPage, id } = useParams<keyof MyParams>() as MyParams;

  const [searchValue, setSearchValue] = useState(search);
  const [allPages, setAllPages] = useState<number>(1);
  const [curPage, setCurPage] = useState<number>(+currentPage);
  const [selectOption, setSelectOption] = useState<number>(10);

  const [data, setData] = useState<
    { title: string; poster_path: string; id: number }[]
  >([]);

  const [isFetchingData, setisFetchingData] = useState(false);

  const fetchData = (keyWord: string = "", pageNumber = 1) => {
    setisFetchingData(true);

    let url;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${KEY}}`,
      },
    };

    if (keyWord) {
      url = `${URL}/search/movie?query=${keyWord}&include_adult=false&language=en-US&page=${pageNumber}`;
    } else {
      url = `${URL}/search/movie&include_adult=false&language=en-US&page=${pageNumber}`;
    }

    fetch(url, options)
      .then((response) => response.json())
      .then(
        (result: {
          results: { title: string; poster_path: string; id: number }[];
          message: string;
          total_pages: number;
        }) => {
          if (result.message) {
            alert(
              `SORRY, but you clicked a lot! so server wnat you to wait a few minutes and try again${result.message}`,
            );
          }
          console.log(result.results[0]);

          setData(result.results);

          setSearchValue(keyWord);
          setAllPages(result.total_pages);

          setisFetchingData(false);
        },
      )
      .catch((error) => {
        setisFetchingData(false);
      });
  };

  const searchingHandler = () => {
    // const keyWord = searchValue.trim();
    //
    // if (keyWord) {
    //   fetchData(keyWord);
    // } else {
    //   fetchData("a");
    // }
    //
    // localStorage.setItem("keyWord", keyWord);
    setCurPage(1);
    navigate(`/search/${searchValue}/currentPage/1`);
  };

  useEffect(() => {
    const { pathname } = location;

    if (pathname.includes("/details")) {
      navigate(`/search/${searchValue}/currentPage/${curPage}/details/${id}`);
    } else {
      navigate(`/search/${searchValue}/currentPage/${curPage}`);
    }
  }, [curPage]);

  useEffect(() => {
    // const keyWord = localStorage.getItem("keyWord");
    // if (keyWord) {
    //   fetchData(keyWord);
    // }

    fetchData(search, curPage);
  }, [location]);

  const searchingValue = (value: string) => {
    setSearchValue(value);
  };

  const handleDetails = (idCur: number) => {
    navigate(
      `/search/${searchValue}/currentPage/${currentPage}/details/${idCur}`,
    );
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectOption(+value);
    navigate(`/search/${searchValue}/currentPage/1`);
  };

  return (
    <div className="flex">
      <div className="grow-1 gap-y-10 flex-col flex">
        <SearchSection
          searchValue={searchValue}
          onChangeValue={searchingValue}
          onSearch={searchingHandler}
        />
        <DataSection
          searchArray={data}
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
        />
      </div>
      <Outlet />
    </div>
  );
};

export default App;
