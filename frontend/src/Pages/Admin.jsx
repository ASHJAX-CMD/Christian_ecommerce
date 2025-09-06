import React, { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

const Admin = () => {
  const [activetab, setActivetab] = useState("orders");
  const location = useLocation();

  return (
    <div className="w-screen h-screen bg-gray-200 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <Sidebar
          activetab={activetab}
          pathname={location.pathname}
          setActivetab={setActivetab}
        />
      </div>

      {/* Main content area (Outlet) */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
