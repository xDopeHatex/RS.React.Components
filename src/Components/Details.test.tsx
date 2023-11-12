import React, { createRef } from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, Routes } from "react-router-dom";

import { MemoryRouter, Route } from "react-router-dom";
import Details from "./Details";

vi.mock("node-fetch");

describe("Tests for the Detailed Card component", () => {
  // test("Make sure the detailed card component correctly displays the detailed card data;", async () => {
  //   render(
  //     <BrowserRouter>
  //       <Details />
  //     </BrowserRouter>,
  //   );
  //
  //   expect(screen.getByTestId("detailes")).toBeInTheDocument();
  //
  //   // Assertion
  //
  //   // Restore the original useState implementation
  //   // React.useState = originalUseState;
  // });

  test("Check that a loading indicator is displayed while fetching data;", async () => {
    const mockData = {
      original_title: "Test Movie",
      original_language: "English",
      poster_path: "/test-image.jpg",
      genres: [{ name: "Action" }],
      production_countries: [{ name: "United States" }],
    };

    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    render(
      <MemoryRouter initialEntries={["/details/1"]}>
        <Details />
      </MemoryRouter>,
    );

    // Check if loader is displayed while fetching data
    expect(screen.getByText("Fetching Data...")).toBeInTheDocument();
  });
});
