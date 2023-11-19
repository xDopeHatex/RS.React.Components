import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { moviesActions } from "../store/movies/movies.slice";

const actions = {
  ...moviesActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
