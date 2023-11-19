import React from "react";
import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import Details from "./Details";
import { store } from "../store";
import { Provider } from "react-redux";

vi.mock("node-fetch");

describe("Tests for the Detailed Card component", () => {
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
      <Provider store={store}>
        <MemoryRouter initialEntries={["/details/1"]}>
          <Details />
        </MemoryRouter>
      </Provider>,
    );

    // Check if loader is displayed while fetching data
    expect(screen.getByText("Fetching Data...")).toBeInTheDocument();
  });
});
