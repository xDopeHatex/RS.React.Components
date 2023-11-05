import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import "./index.css";
import ErrorBoundary from "./Components/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";
import Pages from "./Components/Pages";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <main className="w-screen h-screen main-bg">
          <Pages />
        </main>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
