import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import ErrorBoundary from "./Components/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import Pages from "./Components/Pages";

import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary data-testid="error-boundary">
        <BrowserRouter>
          <main className="w-screen h-screen main-bg">
            <Pages />
          </main>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
);
