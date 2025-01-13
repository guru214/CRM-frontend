import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import instance from './endpoint';

const isAuthenticated = async () => {
  try {
    const response = await instance.get('/api/v1/auth/isLoggedin');
    console.log("Response status:", response.status); // Add debugging log
    return response.status === 200;
  } catch (error) {
    console.error("Error checking authentication:", error); // Add debugging log
    return false;
  }
};

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated();
      console.log("Authentication result:", result); // Add debugging log
      setAuthenticated(result);
    };

    checkAuth();
  }, []);

  if (authenticated === null) {
    return null; // Prevent rendering until the authentication check is complete
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
