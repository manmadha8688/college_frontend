import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Public Pages
import Login from "./pages/Login";

// About Section
import About from "./pages/About";
import AboutCollege from "./pages/About/College";
import VisionMission from "./pages/About/VisionMission";
import PrincipalsMessage from "./pages/About/PrincipalsMessage";
import Accreditation from "./pages/About/Accreditation";
import ManagementCommittee from "./pages/About/ManagementCommittee";

// Contact Page
import Contact from "./pages/Contact";

// Academics Section
import Academics from "./pages/Academics";
import Departments from "./pages/Academics/Departments";
import Courses from "./pages/Academics/Courses";
import Calendar from "./pages/Academics/Calendar";
import Faculty from "./pages/Academics/Faculty";
import Facilities from "./pages/Academics/Facilities";

// Admissions Section
import Admissions from "./pages/Admissions";
import Process from "./pages/Admissions/Process";
import Eligibility from "./pages/Admissions/Eligibility";
import Fees from "./pages/Admissions/Fees";
import Apply from "./pages/Admissions/Apply";

// Admin Components
import AdminLayout from "./pages/Dashboard/Admin/AdminLayout";
import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";

// Staff Components
import StaffLayout from "./pages/Dashboard/Staff/StaffLayout";
import StaffDashboard from "./pages/Dashboard/Staff/StaffDashboard";

// Student Components
import StudentLayout from "./pages/Dashboard/Student/StudentLayout";
import StudentDashboard from "./pages/Dashboard/Student/StudentDashboard";

// Shared Dashboard Components
import AddStudent from "./pages/Dashboard/AddStudent";
import AddStaff from "./pages/Dashboard/AddStaff";
import AddNotice from "./pages/Dashboard/AddNotice";
import Profile from "./pages/Dashboard/Profile";
import StudentsList from "./pages/Dashboard/StudentsList";
import StaffList from "./pages/Dashboard/StaffList";
import Notices from "./pages/Dashboard/Notices";
import Hodlist from "./pages/Dashboard/Hodlist";

// Import CSS
import "./styles/About.css";
import "./styles/VisionMission.css";
import "./styles/PrincipalsMessage.css";
import "./styles/Accreditation.css";
import "./styles/Academics.css";
import "./styles/Admissions.css";
import LandingPage from "./pages/LandingPage";
import Syllabus from "./pages/Dashboard/syllabus";
import StudentSyllabus from "./pages/Dashboard/StudentSyllabus";

// Wrapper component for ProtectedRoute to use hooks
const ProtectedRouteWrapper = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes with MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* About Section */}
            <Route path="/about" element={<About />}>
              <Route index element={<AboutCollege />} />
              <Route path="college" element={<AboutCollege />} />
              <Route path="vision-mission" element={<VisionMission />} />
              <Route path="principals-message" element={<PrincipalsMessage />} />
              <Route path="accreditation" element={<Accreditation />} />
              <Route path="management-committee" element={<ManagementCommittee />} />
            </Route>
            
            {/* Academics Section */}
            <Route path="/academics" element={<Academics />}>
              <Route index element={<Navigate to="departments" replace />} />
              <Route path="departments" element={<Departments />} />
              <Route path="courses" element={<Courses />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="faculty" element={<Faculty />} />
              <Route path="facilities" element={<Facilities />} />
            </Route>
            
            {/* Admissions Section */}
            <Route path="/admissions" element={<Admissions />}>
              <Route index element={<Navigate to="process" replace />} />
              <Route path="process" element={<Process />} />
              <Route path="eligibility" element={<Eligibility />} />
              <Route path="fees" element={<Fees />} />
              <Route path="apply" element={
                <ProtectedRouteWrapper allowedRoles={['student', 'admin', 'staff']}>
                  <Apply />
                </ProtectedRouteWrapper>
              } />
            </Route>
            
            {/* Contact Page */}
            <Route path="/contact" element={<Contact />} />
          </Route>
          
          {/* Protected Dashboard Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRouteWrapper allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRouteWrapper>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="add-student" element={<AddStudent />} />
            <Route path="add-staff" element={<AddStaff />} />
            <Route path="add-notice" element={<AddNotice />} />
            <Route path="students" element={<StudentsList />} />
            <Route path="staff" element={<StaffList />} />
            <Route path="hods" element={<Hodlist />} />
            <Route path="syllabus" element={<Syllabus />} />

            <Route path="notices" element={<Notices />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route
            path="/staff/*"
            element={
              <ProtectedRouteWrapper allowedRoles={['staff']}>
                <StaffLayout />
              </ProtectedRouteWrapper>
            }
          >
            <Route index element={<StaffDashboard />} />
            <Route path="add-notice" element={<AddNotice />} />
            <Route path="add-student" element={<AddStudent />} />
            <Route path="notices" element={<Notices />} />
            <Route path="syllabus" element={<Syllabus />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route
            path="/student/*"
            element={
              <ProtectedRouteWrapper allowedRoles={['student']}>
                <StudentLayout />
              </ProtectedRouteWrapper>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="notices" element={<Notices />} />
            <Route path="syllabus" element={<StudentSyllabus />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;