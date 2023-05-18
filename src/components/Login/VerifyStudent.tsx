import React, { FC, useEffect, FormEvent } from 'react';
import axios from 'axios';
import Logo from '../../assets/resetLogo.svg';
import { toast } from 'react-toastify';

import api from '../../api/request';
import { baseUrl } from '../../config';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword: FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    verifyUser();
  }, []);
  const verifyUser = (): void => {
    axios
      .get(`${baseUrl}/auth/verifyToken/${params?.token ?? ''}`)
      .then(() => {
        console.log('');
      })
      .catch(() => {
        navigate('/');
      });
  };
  const handleVerifyStudent = (e: FormEvent<HTMLButtonElement>): void => {
    void api('put', `/students/verifystudent/${params?.token ?? ''}`, {
      actuve: true,
    })
      .then((res) => {
        toast.success('Email Verified Successfully');

        navigate('/login');
      })
      .catch(() => {
        console.log('err');
      });
  };
  return (
    <div className="resetmainDiv">
      <div className="resetlogoDiv">
        <img src={Logo} alt="logo" />
      </div>
      <div className="resetFormDiv">
        <div className="resetTitle">E-mail Confirmation</div>
        <div className="restdescription">Click Here to Verify Your Account</div>

        <div style={{ textAlign: 'center' }}>
          <button className="resetbtn" onClick={handleVerifyStudent}>
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
