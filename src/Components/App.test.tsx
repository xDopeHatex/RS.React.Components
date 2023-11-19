import { render, screen } from "@testing-library/react";
import App from "./App";
import { expect } from "vitest";

import { BrowserRouter } from "react-router-dom";
import { store } from "../store";
import { Provider } from "react-redux";

it("should have render", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );
  const div = screen.getAllByRole("heading");
  expect(div.length).toBe(1);
});
