import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';
import { UpdateStore } from '../context/store';
import User from '../types/user';

const authApi = (): void => {
  const updateStore = UpdateStore();
  const isLogin = localStorage.getItem('token');
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

  const validLogin = (): void => {
    void axios
      .get(`${baseUrl}/auth`, {
        headers: {
          Authorization: `Bearer ${isLogin ?? ''}`,
        },
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .then((res) => {
        if (res?.data) {
          if (updateStore) {
            updateStore({ user: res?.data.user as User });
          }
        }
      })
      .catch((err) => {
        if (err?.request?.status === 403) {
          localStorage.removeItem('userData');
          localStorage.removeItem('token');
          navigate('/');
        }
      });
  };

  useEffect(() => {
    validLogin();
  }, []);
};
export default authApi;
