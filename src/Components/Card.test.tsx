import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./Card";
import { beforeEach, describe, expect } from "vitest";
import { useNavigate } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";
import {
  TypeDataSectionProps,
  TypeDataList,
  TypeDataItem,
} from "../types/types";
import { ItemsContext } from "../store/StoreContext";
import { IMGAGE_URL } from "../constants/constants";
import * as events from "events";

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
        <BrowserRouter>
          <Card handleDetails={handleDetails} item={item} />
        </BrowserRouter>,
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
        <BrowserRouter>
          <Card handleDetails={handleDetails} item={item} />
        </BrowserRouter>,
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
