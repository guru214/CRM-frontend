 import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import { Container } from "react-bootstrap"; // React-Bootstrap component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

// Components
import Sidebar from "./components/userComponents/Sidebar.js";
import UserTable from "./components/userComponents/UserTable.js";
import Dashboard from "./components/userComponents/Dashboard.js";
import ReferAndEarn from "./components/userComponents/Referal.js";
import Positions from "./components/userComponents/Position.js";
import ProfilePage from "./components/userComponents/Profile.js";
import PammTable from "./components/userComponents/PammTable.js";
import TradingSignals from "./components/userComponents/TradingSignals.js"; 
import DepositWithdraw from "./components/userComponents/Banking.js";       
import APIAccessPage from "./components/userComponents/API.js";
import OrderHistoryPage from "./components/userComponents/History.js";      
import DashboardPage from "./components/userComponents/Home.js";
import SignInForm from "./components/userComponents/Login.js";
import RegisterForm from "./components/userComponents/Register.js";
import ForgotPassword from "./components/userComponents/forgetpassword.js"; 
import TradeGraph from "./components/userComponents/TradingViewWidget.js";  
import Testing from "./components/userComponents/testing.js";
import VerifyEmail from './components/userComponents/VerifyEmail.js';
import EmailVerify from "./components/userComponents/EmailVerify.js";
import AdminDashboard from "./components/adminComponents/Dashboard.js";
import ProtectedRoute from "./services/ProtectedRoutes.js";
import PublicRoute from "./services/PublicRoutes.js";
import ProtectedAdminRoute from "./services/ProtectedAdminRoutes.js";
// Removed unused 'Unauthorized' import
import Header from "./components/userComponents/Header.js";

// Protected Layout Component
const ProtectedLayout = ({ children }) => (
  <Container fluid className="p-0">
    <Header page="dashboard" />
    <main style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>{children}</div>
    </main>
  </Container>
);

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<SignInForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
          <Route path="/user-table" element={<ProtectedLayout><UserTable /></ProtectedLayout>} />
          <Route path="/referal" element={<ProtectedLayout><ReferAndEarn /></ProtectedLayout>} />
          <Route path="/positions" element={<ProtectedLayout><Positions /></ProtectedLayout>} />
          <Route path="/profile" element={<ProtectedLayout><ProfilePage /></ProtectedLayout>} />
          <Route path="/pammTable" element={<ProtectedLayout><PammTable /></ProtectedLayout>} />
          <Route path="/tradesignal" element={<ProtectedLayout><TradingSignals /></ProtectedLayout>} />
          <Route path="/bank" element={<ProtectedLayout><DepositWithdraw /></ProtectedLayout>} />
          <Route path="/api" element={<ProtectedLayout><APIAccessPage /></ProtectedLayout>} />
          <Route path="/history" element={<ProtectedLayout><OrderHistoryPage /></ProtectedLayout>} />
          <Route path="/home" element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
          <Route path="/tradingwidget" element={<ProtectedLayout><TradeGraph /></ProtectedLayout>} />
          <Route path="/testing" element={<ProtectedLayout><Testing /></ProtectedLayout>} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/adminDashboard" element={<ProtectedLayout><AdminDashboard /></ProtectedLayout>} />
          <Route path="*" element={<Navigate to="/unauthorized" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
