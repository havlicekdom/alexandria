import React from 'react';
import {
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';

import routes from 'constants/routes';
import { useAppSelector } from 'store/hooks';
import { selectIsLoggedIn } from 'store/auth/authSlice';
import Navigation from '../Navigation';

import * as S from './ProtectedRoute.styled';
import TopBar from '../TopBar';

function ProtectedRoute() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={routes.login} state={{ from: location }} replace />;
  }

  return (
    <>
      <Navigation />
      <S.ContentWrapper>
        <TopBar />
        <Outlet />
      </S.ContentWrapper>
    </>
  );
}

export default ProtectedRoute;
