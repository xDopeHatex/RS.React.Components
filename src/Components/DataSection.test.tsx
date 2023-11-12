import { render, screen } from "@testing-library/react";
import DataSection from "./DataSection";
import { beforeEach, describe, expect } from "vitest";
import { useNavigate } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";
import { TypeDataSectionProps, TypeDataList } from "../types/types";
import { ItemsContext } from "../store/StoreContext";

describe("Tests for the Card List component", () => {
  it("Verify that the component renders the specified number of cards", () => {
    const mockCard = {
      title: "Example Title",

      poster_path: "example_path",
    };

    const mockCardsList = Array(20)
      .fill(mockCard)
      .map((item, index) => {
        return { ...item, id: index };
      });

    const handleDetails = (idCur: number) => {};
    function renderData(data: TypeDataList) {
      return render(
        <BrowserRouter>
          <ItemsContext.Provider value={data}>
            <DataSection handleDetails={handleDetails} isLoading={false} />
          </ItemsContext.Provider>
        </BrowserRouter>,
      );
    }

    renderData(mockCardsList);
    const items = screen.getAllByTestId("item");
    expect(items.length).toBe(20);
  });

  it("Check that an appropriate message is displayed if no cards are present.", () => {
    const mockCardsList: [] = [];

    const handleDetails = (idCur: number) => {};
    function renderData(data: TypeDataList) {
      return render(
        <BrowserRouter>
          <ItemsContext.Provider value={data}>
            <DataSection handleDetails={handleDetails} isLoading={false} />
          </ItemsContext.Provider>
        </BrowserRouter>,
      );
    }

    renderData(mockCardsList);
    const nodata = screen.getByTestId("nodata");
    expect(nodata).toBeInTheDocument();
  });
});
