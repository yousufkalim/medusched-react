import React, { ReactElement } from 'react';
import SingleElective from '../components/StudentDashboard/SingleElective';
import Home from '../pages/home/Home';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import HospitalLogin from '../pages/HospitalLogin';
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
    element: (
      <PublicRoute>
        <Home />
      </PublicRoute>
    ),
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
    path: '/Hospitallogin',
    element: (
      <PublicRoute>
        <HospitalLogin />
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
    path: '/dashboard',
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
