import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className=" h-full flex justify-center items-center">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
