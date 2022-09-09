import React from 'react';
import {
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';

import { useAppSelector } from 'store/hooks';
import { selectIsLoggedIn } from 'store/auth/authSlice';
import Navigation from '../Navigation';

function ProtectedRoute() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
