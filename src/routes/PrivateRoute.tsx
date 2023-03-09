import React, { FC, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';
import { UpdateStore } from '../context/store';
import User from '../types/user';

interface IPrivateRoute {
  children: ReactNode;
}

const PrivateRoute: FC<IPrivateRoute> = ({ children }) => {
  const updateStore = UpdateStore();
  const isLogin = localStorage.getItem('token');
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const validateLogin = async () => {
    axios
      .get(`${baseUrl}/auth`, {
        headers: {
          Authorization: `Bearer ${isLogin ?? ''}`,
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then((res) => {
        if (res?.data) {
          console.log(res?.data);
          if (updateStore) {
            updateStore({ user: res?.data.user as User });
          }
        }
        console.log('private', res);
      })
      .catch((err) => {
        if (err?.request?.status === 403) {
          localStorage.removeItem('userData');
          localStorage.removeItem('token');
          navigate('/login');
        }
      });
  };
  useEffect(() => {
    void validateLogin();
  }, []);
  if (isLogin) {
    return <> {children}</>;
  }
  return <Navigate to="/login" />;
};
export default PrivateRoute;
