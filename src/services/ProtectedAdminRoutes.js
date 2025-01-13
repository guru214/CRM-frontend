import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import instance from '../services/endpoint'; // Axios instance with base URL and token

const isAuthor = async () => {
  try {
    const response = await instance.get('/api/v1/auth/isAdmin');
    return response.status === 200;
  } catch (error) {
    console.error('Error checking authorization:', error);
    return false;
  }
};

const ProtectedAdminRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // null indicates loading state

  useEffect(() => {
    const checkAuthorization = async () => {
      const result = await isAuthor();
      setIsAuthorized(result);
    };
    checkAuthorization();
  }, []);

  if (isAuthorized === null) {
    // Render a loading indicator while checking authorization
    return <div>Loading...</div>;
  }

  if (isAuthorized) {
    return children || <Outlet />; // Render children or Outlet if authorized
  }

  return <Navigate to="/unauthorized" />; // Redirect if not authorized
};

export default ProtectedAdminRoute;
