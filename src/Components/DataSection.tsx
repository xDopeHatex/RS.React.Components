import { TypeDataSectionProps } from "../types/types";

import Card from "./Card";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "./Loader";
import { useAppSelector } from "../hooks/redux";
import { useLazySearchMoviesQuery } from "../store/movies/movies.api";
import { useEffect } from "react";
import { useActions } from "../hooks/actions";
import { MyParams } from "./App";

const DataSection = ({ handleDetails, setAllPages }: TypeDataSectionProps) => {
  const localSearch = localStorage.getItem("search")!;
  const { addSearch, placeDataBase, setLoading } = useActions();
  const [fetchData] = useLazySearchMoviesQuery();
  const { currentPage } = useParams<keyof MyParams>() as MyParams;

  const navigate = useNavigate();

  useEffect(() => {
    if (localSearch && localSearch !== "") {
      setLoading(true);
      const fetch = async () => {
        addSearch(localSearch);

        const keyWord = localSearch;
        const pageNumber = currentPage.toString();

        const res = await fetchData({ keyWord, pageNumber });

        if (res?.data?.results) {
          await placeDataBase(await res.data.results!);
        }

        if (res?.data?.total_pages) {
          await setAllPages(await res.data.total_pages!);
        }
      };
      fetch();

      navigate(`/search/${localSearch}/currentPage/${currentPage}`);

      setLoading(false);
    }
  }, []);

  const { dataBase: data, isLoading } = useAppSelector((state) => state.movies);

  return (
    <div className="bg-red-200 rounded-xl flex flex-col  text-lg font-medium relative max-h-[60vh] overflow-y-scroll">
      <div>
        {(!isLoading &&
          data?.length > 0 &&
          data?.map((item, index) => {
            return (
              <Card key={item.id} item={item} handleDetails={handleDetails} />
            );
          })) ||
          (!isLoading && !data?.length && (
            <div data-testid="nodata">There's no data, sorry</div>
          ))}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default DataSection;
