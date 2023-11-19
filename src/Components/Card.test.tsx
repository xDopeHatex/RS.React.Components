import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./Card";
import { describe, expect } from "vitest";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { TypeDataItem } from "../types/types";

import { IMGAGE_URL } from "../constants/constants";

import { store } from "../store";

describe("Tests for the Card component", () => {
  it("Ensure that the card component renders the relevant card data", () => {
    const mockCard = {
      title: "Example Title",

      poster_path: "example_path",
      id: 1,
    };

    const handleDetails = (idCur: number) => {};
    function renderData(item: TypeDataItem) {
      return render(
        <Provider store={store}>
          <BrowserRouter>
            <Card handleDetails={handleDetails} item={item} />
          </BrowserRouter>
        </Provider>,
      );
    }

    renderData(mockCard);
    const item = screen.getByTestId("item");
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent(mockCard.title);
    const img = screen.getByTestId("testimg");
    expect(img).toHaveAttribute("src", `${IMGAGE_URL}${mockCard.poster_path}`);
  });

  it("Validate that clicking on a card opens a detailed card component", () => {
    const mockCard = {
      title: "Example Title",

      poster_path: "example_path",
      id: 1,
    };

    const handleDetails = vi.fn((idCur: number) => {});

    function renderData(item: TypeDataItem) {
      return render(
        <Provider store={store}>
          <BrowserRouter>
            <Card handleDetails={handleDetails} item={item} />
          </BrowserRouter>
        </Provider>,
      );
    }

    renderData(mockCard);
    const item = screen.getByTestId("item");
    expect(item).toBeInTheDocument();
    fireEvent(
      item,
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );

    expect(handleDetails).toHaveBeenCalled();
    expect(handleDetails.mock.calls[0][0]).toEqual(mockCard.id);
  });
});
