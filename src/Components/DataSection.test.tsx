import { render, screen } from "@testing-library/react";
import DataSection from "./DataSection";
import { describe, expect } from "vitest";

import { BrowserRouter } from "react-router-dom";
import { TypeDataList } from "../types/types";

import { store } from "../store";
import { Provider } from "react-redux";

describe("Tests for the Card List component", () => {
  it("Check that an appropriate message is displayed if no cards are present.", () => {
    const mockCardsList: [] = [];

    const handleDetails = (idCur: number) => {};
    function renderData(data: TypeDataList) {
      return render(
        <Provider store={store}>
          <BrowserRouter>
            <DataSection handleDetails={handleDetails} setAllPages={() => {}} />
          </BrowserRouter>
        </Provider>,
      );
    }

    renderData(mockCardsList);
    const nodata = screen.getByTestId("nodata");
    expect(nodata).toBeInTheDocument();
  });
});
