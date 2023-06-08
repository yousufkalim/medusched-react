import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface IPublicRoute {
  children: ReactNode;
}

const PublicRoute: FC<IPublicRoute> = ({ children }) => {
  const isLogin = localStorage.getItem('token');
  if (isLogin) {
    return <Navigate to="/dashboards" replace />;
  }
  return <>{children}</>;
};

export default PublicRoute;
