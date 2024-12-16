// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from "react-router-dom";
import { getAccessToken } from '../../utils/tokenutils';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
