import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="grid grid-cols-9 bg-gray-100 items-baseline">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
