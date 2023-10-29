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

export type TypeSearchSectionState = object;

export type TypeSearchItem = {
  id: number;
  name: string;
};

export type TypeAppComponentState = {
  searchValue: string;
  data: TypeSearchItem[];
  isFetchingData: boolean;
};

export type TypeAppComponentProps = object;

export type TypeDataSectionState = object;

export type TypeDataSectionProps = {
  searchArray: TypeSearchItem[];
  isLoading: boolean;
};
