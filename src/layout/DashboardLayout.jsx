import React from "react";
import Sidebar from "../pages/Dashboard/Sidebar";
import Topbar from "../pages/Dashboard/Topbar";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  return (
    <div className="layout-container">

      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="content-wrapper">
          <Outlet />  
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;
