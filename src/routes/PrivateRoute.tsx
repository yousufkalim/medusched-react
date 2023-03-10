import React, { FC, ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import apiAuth from '../utils/common';

interface IPrivateRoute {
  children: ReactNode;
}

const PrivateRoute: FC<IPrivateRoute> = ({ children }) => {
  const isLogin = localStorage.getItem('token');
  apiAuth();

  if (isLogin) {
    return <> {children}</>;
  }
  return <Navigate to="/" />;
};
export default PrivateRoute;
