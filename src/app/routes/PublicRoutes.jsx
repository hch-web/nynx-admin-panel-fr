import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function PublicRoutes() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const { state } = useLocation();

  return isAuthenticated ? <Navigate to={state?.from || '/'} /> : <Outlet />;
}

export default PublicRoutes;
