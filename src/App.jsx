import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";

// 🔐 Private Route to Protect Dashboard
const PrivateRoute = ({ children }) => {
  const adminId = localStorage.getItem("adminId"); // Check for adminId instead of token
  return adminId ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route for Login */}
        <Route path="/" element={<Login />} />
        
        {/* Private Route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        
        {/* Redirect unknown routes to Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
