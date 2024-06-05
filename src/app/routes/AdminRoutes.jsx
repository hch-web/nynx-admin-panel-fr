import useGetUserData from 'customHooks/useGetUserData';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoutes() {
  const { isSuperUser } = useGetUserData();

  return isSuperUser ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoutes;
