import { Outlet } from "react-router-dom";

const Wrapper = () => {
  return (
    <div
      className="max-w-[600px] mx-auto pt-[20px] flex flex-col gap-y-20 "
      data-testid="wrapper"
    >
      <Outlet />
    </div>
  );
};

export default Wrapper;
