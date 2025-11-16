import React from "react";
import { useAuth } from "../../context/AuthContext";
import "./Topbar.css";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <nav className="top-nav">
      <h1>Dashboard</h1>
      <div className="user-info">
        {user?.first_name || user?.email}
      </div>
    </nav>
  );
};

export default Topbar;
