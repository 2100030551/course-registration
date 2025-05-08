import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/common/Home";
import Index from "./components/common/Index";
import Login from "./components/before-login/Login";
import Register from "./components/before-login/Register";
import ForgotPassword from "./components/before-login/ForgotPassword";
import Dashboard from "./components/after-login/Dashboard";
import CourseList from "./components/after-login/CourseList";
import Profile from "./components/after-login/Profile";
import Settings from "./components/after-login/Settings";
import Footer from "./components/common/Footer";
import Sidebar from "./components/after-login/Sidebar";
import AcademicRegistration from "./components/after-login/AcademicRegistration";
import AcademicCalendar from "./components/AcademicCalendar";
import MyCourses from "./components/after-login/MyCourses";
import Timetable from "./components/after-login/Timetable";
import EnrolledCourses from "./components/after-login/EnrolledCourses";
import "./styles/global.css";

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [registeredCourses, setRegisteredCourses] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const handleEnroll = (course) => {
    if (!enrolledCourses.some((enrolled) => enrolled.id === course.id)) {
      setEnrolledCourses((prev) => [...prev, course]);
    }
  };

  const handleUnenroll = (course) => {
    setEnrolledCourses((prev) => prev.filter((enrolled) => enrolled.id !== course.id));
  };

  // Update the handleRegisterCourses function:
const handleRegisterCourses = (semester, courses) => {
  setRegisteredCourses(prev => ({
    ...prev,
    [semester]: courses
  }));
};

  // In your App.js, the ProtectedRoute should look like this:
const ProtectedRoute = ({ children }) => {
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

  const AfterLoginLayout = ({ children }) => (
    <div>
      <Index setIsLoggedIn={setIsLoggedIn} />
      <div style={{ display: "flex" }}>
        <Sidebar registeredCourses={registeredCourses} enrolledCourses={enrolledCourses} />
        <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>{children}</div>
      </div>
    </div>
  );

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <>
              <Home 
                showLogin={() => setShowLogin(true)} 
                showRegister={() => setShowRegister(true)}
                showForgotPassword={() => setShowForgotPassword(true)}
              />
              {showLogin && (
                <Login 
                  setIsLoggedIn={setIsLoggedIn}
                  onClose={() => setShowLogin(false)}
                  showRegister={() => {
                    setShowLogin(false);
                    setShowRegister(true);
                  }}
                  showForgotPassword={() => {
                    setShowLogin(false);
                    setShowForgotPassword(true);
                  }}
                />
              )}
              {showRegister && (
                <Register 
                  onClose={() => setShowRegister(false)}
                  showLogin={() => {
                    setShowRegister(false);
                    setShowLogin(true);
                  }}
                />
              )}
              {showForgotPassword && (
                <ForgotPassword 
                  onClose={() => setShowForgotPassword(false)}
                  showLogin={() => {
                    setShowForgotPassword(false);
                    setShowLogin(true);
                  }}
                />
              )}
            </>
          } 
        />
        
        {/* Standalone Auth Routes */}
        <Route
          path="/login"
          element={
            <>
              <Home 
                showLogin={() => setShowLogin(true)}
                showRegister={() => setShowRegister(true)}
                showForgotPassword={() => setShowForgotPassword(true)}
              />
              <Login 
                setIsLoggedIn={setIsLoggedIn}
                onClose={() => window.history.back()}
                showRegister={() => window.location.href = '/register'}
                showForgotPassword={() => window.location.href = '/forgot-password'}
              />
            </>
          }
        />
        
        <Route
          path="/register"
          element={
            <>
              <Home 
                showLogin={() => setShowLogin(true)}
                showRegister={() => setShowRegister(true)}
                showForgotPassword={() => setShowForgotPassword(true)}
              />
              <Register 
                onClose={() => window.history.back()}
                showLogin={() => window.location.href = '/login'}
              />
            </>
          }
        />
        
        <Route
          path="/forgot-password"
          element={
            <>
              <Home 
                showLogin={() => setShowLogin(true)}
                showRegister={() => setShowRegister(true)}
                showForgotPassword={() => setShowForgotPassword(true)}
              />
              <ForgotPassword 
                onClose={() => window.history.back()}
                showLogin={() => window.location.href = '/login'}
              />
            </>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AfterLoginLayout>
                <Dashboard />
              </AfterLoginLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <AfterLoginLayout>
                <CourseList onEnroll={handleEnroll} />
              </AfterLoginLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AfterLoginLayout>
                <Profile />
              </AfterLoginLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AfterLoginLayout>
                <Settings />
              </AfterLoginLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/academic-registration"
          element={
            <ProtectedRoute>
              <AfterLoginLayout>
                <AcademicRegistration onRegister={handleRegisterCourses} />
              </AfterLoginLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <AfterLoginLayout>
                <MyCourses registeredCourses={registeredCourses} />
              </AfterLoginLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <AfterLoginLayout>
                <AcademicCalendar />
              </AfterLoginLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/timetable"
          element={
            <ProtectedRoute>
              <AfterLoginLayout>
                <Timetable registeredCourses={registeredCourses} />
              </AfterLoginLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/enrolled-courses"
          element={
            <ProtectedRoute>
              <AfterLoginLayout>
                <EnrolledCourses courses={enrolledCourses} onUnenroll={handleUnenroll} />
              </AfterLoginLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Conditionally Render Footer */}
      {!isLoggedIn && <Footer />}
    </>
  );
}

export default AppWrapper;