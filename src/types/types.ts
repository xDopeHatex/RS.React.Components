import { ErrorInfo } from "react";

export type TypeErrorBoundaryProps = {
  children: React.ReactNode;
};

export type TypeErrorBoundaryState = {
  error: null | Error;
  errorInfo: null | ErrorInfo;
};

export type TypeSearchSectionProps = {
  searchValue: string;
  onChangeValue: (value: string) => void;
  onSearch: () => void;
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
  handleDetails: (idCur: number) => void;
  searchArray: TypeSearchItem[];
  isLoading: boolean;
};
