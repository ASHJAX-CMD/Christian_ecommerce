import React, { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

import AdminSocketHandler from "../features/admin/AdminSocketHandler.jsx";
import AdminLayout from "../features/admin/AdminLayout.jsx";
import { useSelector } from "react-redux";
const Admin = () => {
  const [activetab, setActivetab] = useState("orders");
  const location = useLocation();
  const user = useSelector((state)=>state.user.user);
  return (
    <div className="w-screen h-screen bg-gray-200 flex">
      {/* Sidebar */}
      <AdminSocketHandler user={user} />
      <div className="w-64 bg-white shadow-md">
        <Sidebar
          activetab={activetab}
          pathname={location.pathname}
          setActivetab={setActivetab}
        />
      </div>

      {/* Main content area (Outlet) */}
      
      <div className="flex-1 overflow-y-auto">
        <AdminLayout  >
        <Outlet />
        </AdminLayout>
      </div>
    </div>
  );
};

export default Admin;
