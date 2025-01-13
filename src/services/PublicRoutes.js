import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import instance from './endpoint';

const isAuthenticated = async () => {
  try {
    const response = await instance.get('/api/v1/auth/isLoggedin');
    console.log("astest",response)

    return response.status === 200;
  } catch (error) {
    return false;
  }
};

const PublicRoute = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated();
      setAuthenticated(result);
    };

    checkAuth();
  }, []);

  if (authenticated === null) {
    return null; // Prevent rendering until the authentication check is complete
  }

  return authenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
