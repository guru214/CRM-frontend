import React from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"; // React-Bootstrap components

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
import ProtectedRoute from "./services/ProtectedRoutes.js";
import PublicRoute from "./services/PublicRoutes.js";
import EmailVerify from "./components/userComponents/EmailVerify.js";
import AdminDashboard from "./components/adminComponents/Dashboard.js";
import { ToastContainer } from "react-toastify";
import Header from "./components/userComponents/Header.js";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toasts
import ResetPassword from "./components/userComponents/ResetPassword.js";
import ProtectedAdminRoute from "./services/ProtectedAdminRoutes.js";
import Unauthorized from "./components/userComponents/Unauthorized.js";
// import CookieHandler from "./components/CookieHandler.js";
const ProtectedLayout = ({ children }) => (
  <Container fluid className="p-0">
     
     <Header page="dashboard" />
 {/* <Sidebar/> */}
 <main style={{ display: "flex" }}>
   <div>
     <Sidebar />
   </div>
         
         <div style={{ flex: 1 }}>{children}</div>
       </main>
   </Container>
 );
 
// const ProtectedLayout = ({ children }) => (
//   <Container fluid className="p-0">
//     <Row className="g-0">
//       {/* Sidebar */}
//       <Col
//         xs={12}
//         md={3}
//         lg={2}
//         className="bg-light min-vh-100 p-0"
//         style={{ maxWidth: "250px" }}
//       >
//         <Sidebar />
//       </Col>
//       {/* Main Content */}
//       <Col xs={12} md={9} lg={10} className="p-4">
//         {children}
//       </Col>
//     </Row>
//   </Container>
// );

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
          <Route path="/resetPassword/:resetToken" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verifyEmail/:emailVerifyToken" element={<EmailVerify />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>

        {/* Private Routes */}
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

        <Route element={<ProtectedAdminRoute />}> 
          <Route path="/adminDashboard" element={<ProtectedLayout><AdminDashboard /></ProtectedLayout>} /> 
          <Route path="*" element={<Navigate to="/unauthorized" />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

    // "start": "cross-env HTTPS=true SSL_CRT_FILE=certs/localhost.pem SSL_KEY_FILE=certs/localhost-key.pem react-scripts start",
