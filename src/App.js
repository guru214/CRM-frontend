   import React from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { Container } from "react-bootstrap"; // Only keep necessary imports

// Components
import Sidebar from "./components/userComponents/Sidebar.js";
import Dashboard from "./components/userComponents/Dashboard.js";
import SignInForm from "./components/userComponents/Login.js";
import RegisterForm from "./components/userComponents/Register.js";
import ForgotPassword from "./components/userComponents/forgetpassword.js";
import ProtectedRoute from "./services/ProtectedRoutes.js";
import PublicRoute from "./services/PublicRoutes.js";
import ProtectedAdminRoute from "./services/ProtectedAdminRoutes.js";
import Unauthorized from "./components/userComponents/Unauthorized.js";
import EmailVerify from './components/userComponents/EmailVerify.js';
import AdminDashboard from "./components/adminComponents/Dashboard.js";
import { ToastContainer } from "react-toastify";
import Header from "./components/userComponents/Header.js";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toasts

// Layout
const ProtectedLayout = ({ children }) => (
  <Container fluid className="p-0">
    <Header page="dashboard" />
    <main style={{ display: "flex" }}>
      <div>
        <Sidebar />
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </main>
  </Container>
);

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<SignInForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<EmailVerify />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>

        {/* Private Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
          {/* Add other protected routes as needed */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/adminDashboard" element={<ProtectedLayout><AdminDashboard /></ProtectedLayout>} />
          <Route path="*" element={<Navigate to="/unauthorized" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

