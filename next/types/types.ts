import { ErrorInfo } from "react";

export type TypeErrorBoundaryProps = {
  children: React.ReactNode;
};
export type TypeDataItem = { title: string; poster_path: string; id: number };

export type TypeDataList = TypeDataItem[];

export type TypeDataListWhole = {
  details?: string | null;
  page?: number | null;
  total_pages?: number | null;
  results: TypeDataList | null;

  searchPhrase?: string;
};

export type TypeErrorBoundaryState = {
  error: null | Error;
  errorInfo: null | ErrorInfo;
};

export type TypeSearchSectionProps = {
  onSearch: string;
};

export type TypePageSectionProps = {
  onSearch: (page?: number, search?: string) => void;
};

export type TypeSearchItem = {
  poster_path: string;
  id: number;
  title: string;
};

export type TypeAppComponentState = {
  searchValue: string;
  data: TypeSearchItem[];
  isFetchingData: boolean;
};

export type TypeAppComponentProps = object;

export type TypeDataSectionProps = {
  data: TypeDataList;
};

export type TypeFilmDetails = {
  production_countries: { name: string }[];
  genres: { name: string }[];

  adult: boolean;
  backdrop_path: string;
  budget: number;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
