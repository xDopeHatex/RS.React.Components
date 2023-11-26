import React from "react";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className="w-screen h-screen main-bg">
      <div
        className="max-w-[80%] mx-auto pt-[20px] flex flex-col gap-y-20 "
        data-testid="wrapper"
      >
        {children}
      </div>
    </main>
  );
};

export default Layout;
