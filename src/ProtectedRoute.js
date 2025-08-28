import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Checks if the user is authenticated by looking for a token in sessionStorage
const ProtectedRoute = () => {
  const token = sessionStorage.getItem('access_token');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
