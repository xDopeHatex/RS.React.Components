import { configureStore } from "@reduxjs/toolkit";
import { formSlice } from "./formSlice";

const reducer = {
  form: formSlice.reducer,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
