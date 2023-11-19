import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "./movies/movies.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { moviesReducer } from "./movies/movies.slice";

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
