import { ErrorInfo } from "react";

export type TypeErrorBoundaryProps = {
  children: React.ReactNode;
};
export type TypeDataItem = { title: string; poster_path: string; id: number };

export type TypeDataList = TypeDataItem[];

export type TypeErrorBoundaryState = {
  error: null | Error;
  errorInfo: null | ErrorInfo;
};

export type TypeSearchSectionProps = {
  onSearch: (search?: string) => void;
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
  setAllPages: React.Dispatch<React.SetStateAction<number>>;
  handleDetails: (idCur: number) => void;
};
