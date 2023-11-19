import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TypeDataList, TypeDataItem } from "../../types/types";
import { URL, KEY } from "../../constants/constants";

type argsType = { keyWord: string; pageNumber: string };

export const moviesApi = createApi({
  reducerPath: "movies/api",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers, { getState }) => {
      const token = KEY;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
    },
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchMovies: build.query<
      {
        results: TypeDataList;
        message: string;
        total_pages: number;
      },
      argsType
    >({
      query: (args: argsType) => {
        const { keyWord, pageNumber } = args;
        console.log(keyWord, pageNumber);
        return {
          url: `/search/movie?query=${keyWord}&include_adult=false&language=en-US&page=${pageNumber}`,
        };
      },
    }),
    // getUserRepos: build.query<iRepo[], string>({
    //     query: (username: string) => ({
    //         url: `users/${username}/repos`,
    //     }),
    // }),
  }),
});

export const { useSearchMoviesQuery, useLazySearchMoviesQuery } = moviesApi;
