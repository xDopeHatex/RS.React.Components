import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Uncontrolled from "./pages/Uncontrolled";
import Controlled from "./pages/Controlled";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" /> },
      { path: "home", element: <Home /> },
      { path: "controlled-form", element: <Controlled /> },
      { path: "uncontrolled-form", element: <Uncontrolled /> },
    ],
  },
]);
