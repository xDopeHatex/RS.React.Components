// import React, { useEffect, useState } from "react";
// import { URL, KEY } from "../constants/constants";
// import { useParams } from "react-router-dom";
// import { MyParams } from "./App";

export type MyParams = {
  id: string;
};

const Details = () => {
  // const { id } = useParams<keyof MyParams>() as MyParams;

  // const url: string = `${URL}/movie/${+id}?language=enп&api_key=${KEY}`;
  // const [isFetchingData, setisFetchingData] = useState(false);
  //
  // const fetchData = () => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //     },
  //   };
  //   setisFetchingData(true);
  //
  //   fetch(url, options)
  //     .then((response) => response.json())
  //     .then(
  //       (result: {
  //         results: { title: string; poster_path: string; id: number }[];
  //         message: string;
  //         total_pages: number;
  //       }) => {
  //         if (result.message) {
  //           alert(
  //             `SORRY, but you clicked a lot! so server wnat you to wait a few minutes and try again${result.message}`,
  //           );
  //         }
  //         console.log(result, "DETA");
  //
  //         setisFetchingData(false);
  //       },
  //     )
  //     .catch((error) => {
  //       setisFetchingData(false);
  //     });
  // };
  //
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      DETAILS<button>CLOSE</button>
    </div>
  );
};

export default Details;
