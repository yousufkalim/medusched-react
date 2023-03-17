import axios, { Method, AxiosResponse, AxiosError } from 'axios';
import { baseUrl } from '../config';
import { toast } from 'react-toastify';

const request = async <T>(method: Method, url: string, body?: T): Promise<T> => {
  const token = localStorage.getItem('token');

  // Axios initialization with default config
  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token ?? ''}`,
    },
    withCredentials: token !== null,
  });

  return await new Promise<T>((resolve, reject) => {
    api
      .request({
        method,
        url,
        data: body,
      })
      .then((response: AxiosResponse<T>) => {
        resolve(response.data);
      })
      .catch((err: AxiosError<T>) => {
        if (err?.response?.status === 403) {
          localStorage.removeItem('token');
          location.pathname = '/login';
        } else {
          console.log('API Error --------> ', err?.response);
          // type assertion to tell TypeScript that the err.response.data object has a message property of type string or undefined.
          const errorMessage =
            (err?.response?.data as { message?: string })?.message ?? err?.message;
          toast.error(errorMessage);
          reject(err);
        }
      });
  });
};

// Export
export default request;
