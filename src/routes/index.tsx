import React, { ReactElement } from 'react';
import Dashboard from '../components/StudentDashboard/Dashboard';
import SingleElective from '../components/StudentDashboard/SingleElective';
import Login from '../components/StudentLogin/Login';
import Home from '../pages/home/Home';
import RegisterPage from '../pages/Register';
import StudentProfile from '../pages/StudentProfile';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Types
interface BaseRoute {
  path: string;
  protected?: boolean;
  failureRedirect?: string;
  children?: Route[];
  role?: string;
}

interface Element extends BaseRoute {
  element: ReactElement;
  navigate?: never;
}

interface Navigate extends BaseRoute {
  navigate: string;
  element?: never;
}

type Route = Element | Navigate;

// Routes
const routes: Route[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: '/electives',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '/electives/:id',
    element: (
      <PrivateRoute>
        <SingleElective />
      </PrivateRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <StudentProfile />
      </PrivateRoute>
    ),
  },

  {
    path: '*',
    navigate: '/',
  },
];

export default routes;
