import React, { useEffect, useState } from "react";
import { URL, KEY, IMGAGE_URL } from "../constants/constants";

import { MyParams } from "./App";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../store/StoreContext";
import { useParams } from "react-router-dom";

type TypeDataItem = {
  genres: [{ name: string }];
  original_title: string;
  original_language: string;
  poster_path: string;
  production_countries: [{ name: string }];
};

const Details = () => {
  const navigate = useNavigate();
  const searchValue = useSearch();
  const { currentPage, id } = useParams<keyof MyParams>() as MyParams;

  const url: string = `${URL}/movie/${+id}?language=en-US`;
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [data, setData] = useState<TypeDataItem>();

  const fetchData = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${KEY}`,
      },
    };
    setIsFetchingData(true);

    fetch(url, options)
      .then((response) => response.json())
      .then((result: TypeDataItem) => {
        console.log(result, "res");
        setData(result);

        setIsFetchingData(false);
      })
      .catch((error) => {
        setIsFetchingData(false);
      });
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const closeDetails = () => {
    navigate(`/search/${searchValue}/currentPage/${currentPage}`);
  };

  return (
    !isFetchingData &&
    data && (
      <div className="flex flex-col gap-6">
        <div>{data?.original_title}</div>
        <div>Original Language: {data?.original_language}</div>
        <img src={`${IMGAGE_URL}${data?.poster_path}`} />
        <div>Genres: {data?.genres.map((item) => item.name)}</div>
        <div>
          {" "}
          Production Counties:{" "}
          {data?.production_countries.map((item) => item.name)}
        </div>
        <button onClick={closeDetails}>CLOSE</button>
      </div>
    )
  );
};

export default Details;
