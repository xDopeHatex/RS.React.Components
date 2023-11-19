import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeDataList } from "../../types/types";

interface MoviesState {
  search: string;
  dataBase: TypeDataList;
  isLoading: boolean;
}

const initialState: MoviesState = {
  search: localStorage.getItem("search") ?? "a",
  dataBase: [],
  isLoading: false,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addSearch(state, action: PayloadAction<string>) {
      console.log(action.payload, "sliceSearch");
      state.search = action.payload;
    },
    placeDataBase(state, action: PayloadAction<TypeDataList>) {
      state.dataBase = action.payload!;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload!;
    },
  },
});

export const moviesActions = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
