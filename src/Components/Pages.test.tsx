// Pages.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, useLocation } from "react-router-dom";

import Pages from "./Pages";

test("renders Pages component", () => {
  // const location = useLocation();
  // Mock localStorage.getItem
  const localStorageMock = {
    getItem: vi.fn(),
  };

  // Mock the initial value for search
  localStorageMock.getItem.mockReturnValueOnce("a");

  // Mock history for BrowserRouter

  render(
    <BrowserRouter>
      <Pages />
    </BrowserRouter>,
  );

  // Check if Wrapper component is present
  const wrapperElement = screen.getByTestId("wrapper");
  expect(wrapperElement).toBeInTheDocument();

  // Check if App component is present
  const appElement = screen.getByTestId("app");
  expect(appElement).toBeInTheDocument();

  // Check if Details component is present
  const detailsElement = screen.queryByTestId("details");
  expect(detailsElement).toBeNull();

  // Check if navigation occurs to the correct URL
  // expect(location.pathname).toBe("/search/a/currentPage/1");
});
