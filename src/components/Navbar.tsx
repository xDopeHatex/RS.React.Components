import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-evenly items-center bg-slate-600 py-4">
      <NavLink
        className={({ isActive }) => {
          return `text-4xl
          ${isActive ? "text-green-600" : "text-blue-400"}`;
        }}
        to="./home"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          return `text-4xl
          ${isActive ? "text-green-600" : "text-blue-400"}`;
        }}
        to="/uncontrolled-form"
      >
        Uncontrolled Form
      </NavLink>
      <NavLink
        className={({ isActive }) => {
          return `text-4xl
          ${isActive ? "text-green-600" : "text-blue-400"}`;
        }}
        to="/controlled-form"
      >
        Controlled Form
      </NavLink>
    </nav>
  );
};

export default Navbar;
