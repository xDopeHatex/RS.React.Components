import React, { useEffect, useState } from "react";
import { URL, IMGAGE_URL, KEY } from "@/constants/constants";
import { TypeDataListWhole, TypeFilmDetails } from "@/types/types";
import { newParam } from "@/helper/newParam";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

type TypeDataItem = {
  genres: [{ name: string }];
  original_title: string;
  original_language: string;
  poster_path: string;
  production_countries: [{ name: string }];
};

const Details = ({
  id,
  data,
  keyWord,
}: {
  data: TypeFilmDetails;
  keyWord: string;
  id: number | string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const closeDetails = async () => {
    await router.push("/" + newParam(page, keyWord));
  };

  return (
    data && (
      <div
        className=" ml-6 flex flex-col gap-6 border-[2px] border-black p-4"
        data-testid="details"
      >
        <div>{data?.original_title}</div>
        <div>Original Language: {data?.original_language}</div>
        <img src={`${IMGAGE_URL}${data?.poster_path}`} />
        <div>Genres: {data?.genres.map((item) => item.name)}</div>
        <div>
          {" "}
          Production Counties:{" "}
          {data?.production_countries.map((item) => item.name)}
        </div>
        <button
          className="rounded-xl bg-black text-white"
          onClick={closeDetails}
        >
          CLOSE
        </button>
      </div>
    )
  );
};

export default Details;
