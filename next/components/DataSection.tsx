import { TypeDataListWhole, TypeDataSectionProps } from "../types/types";

import Card from "./Card";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "./Loader";

import { useEffect } from "react";

import { MyParams } from "./App";
import { newParam } from "@/helper/newParam";

const DataSection = ({
  data,
  keyWord,
}: {
  data: TypeDataListWhole;
  keyWord: string;
}) => {
  // const { addSearch, placeDataBase, setLoading } = useActions();
  // const [fetchData] = useLazySearchMoviesQuery();
  // const { currentPage } = useParams<keyof MyParams>() as MyParams;
  //
  // const navigate = useNavigate();
  //
  // useEffect(() => {
  //   if (localSearch && localSearch !== "") {
  //     setLoading(true);
  //     const fetch = async () => {
  //       addSearch(localSearch);
  //
  //       const keyWord = localSearch;
  //       const pageNumber = currentPage.toString();
  //
  //       const res = await fetchData({ keyWord, pageNumber });
  //
  //       if (res?.data?.results) {
  //         await placeDataBase(await res.data.results!);
  //       }
  //
  //       if (res?.data?.total_pages) {
  //         await setAllPages(await res.data.total_pages!);
  //       }
  //     };
  //     fetch();
  //
  //     navigate(`/search/${localSearch}/currentPage/${currentPage}`);
  //
  //     setLoading(false);
  //   }
  // }, []);
  //
  // const { dataBase: data, isLoading } = useAppSelector((state) => state.movies);

  const params = newParam(
    data.page ? String(data.page) : null,

    keyWord ? keyWord : null,
  );

  console.log(data, keyWord, "ressss");

  return (
    <div className="bg-red-200 rounded-xl flex flex-col  text-lg font-medium relative max-h-[60vh] overflow-y-scroll">
      <div>
        {data
          ? data?.results?.map((item, index) => {
              return <Card key={item.id} item={item} searchParam={params} />;
            })
          : "waiting"}
      </div>
    </div>
  );
};

export default DataSection;
