import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Wrapper from "./Wrapper";
import Details from "./Details";

import App from "./App";

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Wrapper />}>
        <Route index element={<Navigate to={"search/all/currentPage/1"} />} />
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
