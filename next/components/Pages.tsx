import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Wrapper from "./Wrapper";
import Details from "./Details";

import App from "./App";

const Pages = () => {
  const initialValue = "a";

  const search = localStorage.getItem("search")
    ? localStorage.getItem("search")
    : initialValue;

  return (
    <Routes>
      <Route path="/" element={<Wrapper />}>
        <Route
          index
          element={<Navigate to={`search/${search}/currentPage/1`} />}
        />
        <Route
          path="search/:search/currentPage/:currentPage/"
          element={<App />}
        >
          <Route path="details/:id" element={<Details />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Pages;
