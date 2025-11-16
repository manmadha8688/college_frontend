import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import AddStudent from "./pages/Dashboard/AddStudent";
import AddStaff from "./pages/Dashboard/AddStaff";
import AddNotice from "./pages/Dashboard/AddNotice";
import Profile from "./pages/Dashboard/Profile";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- LOGIN PAGE ---------- */}
        <Route path="/login" element={<Login />} />

        {/* ---------- PROTECTED DASHBOARD ---------- */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="add-student" element={<AddStudent />} />
          <Route path="add-staff" element={<AddStaff />} />
          <Route path="add-notice" element={<AddNotice />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* fallback — redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
