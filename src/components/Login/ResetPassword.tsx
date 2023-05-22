import React, { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import Logo from '../../assets/resetLogo.svg';
import Logo2 from '../../assets/resetLogo2.svg';
import HidePassword from '../../assets/hidepass.svg';
import api from '../../api/request';
import { baseUrl } from '../../config';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';

interface IUserObject {
  newpassword: string;
  confirmpassword: string;
}
interface IUserResponse {
  success?: boolean;
  message?: string;
  role?: string;
  password?: string;
}

const ResetPassword: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<IUserObject>({
    newpassword: '',
    confirmpassword: '',
  });
  const [password1, setPassword1] = useState<boolean>(false);
  const [password2, setPassword2] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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
  const handleReset = (e: FormEvent<HTMLButtonElement>): void => {
    // const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    if (user?.newpassword !== user?.confirmpassword) {
      toast.error('Password does not match');
    }
    // if (!pattern.test(user?.newpassword)) {
    //   toast.error('Password does not match or does not meet the complexity requirements');
    // } else
    else {
      setLoading(true);
      void api<IUserResponse>('put', `/auth/reset/${params?.token ?? ''}`, {
        password: user?.newpassword,
      })
        .then((res) => {
          setLoading(false);
          toast.success('Password updated successfully');
          if (res?.role === 'Hospital') {
            navigate('/Hospitallogin');
          } else {
            navigate('/login');
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };
  console.log(loading);
  return (
    <div className="resetmainDiv">
      <div className="resetlogoDiv">
        <img src={Logo} alt="logo" />
      </div>
      <div className="resetFormDiv">
        <div className="resetTitle">Reset Password</div>
        <div className="restdescription">Password must be between 8 and 32 characters.</div>
        <div className="resetInputDiv">
          <p className="loginp"> New Password</p>
          <input
            className="resetInput"
            type={password2 ? 'text' : 'password'}
            placeholder="*********"
            name="newpassword"
            value={user?.newpassword}
            onChange={handleChange}
          />
          <button
            onClick={() => {
              setPassword2(!password2);
            }}
          >
            {' '}
            <img className="resethidePassword" src={HidePassword} alt="hidepass" />
          </button>
        </div>
        <div className="resetInputDiv">
          <p className="loginp">Confirm Password</p>
          <input
            className="resetInput"
            type={password1 ? 'text' : 'password'}
            placeholder="*********"
            name="confirmpassword"
            value={user?.confirmpassword}
            onChange={handleChange}
          />
          <button
            onClick={() => {
              setPassword1(!password1);
            }}
          >
            {' '}
            <img className="resethidePassword" src={HidePassword} alt="hidepass" />
          </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className="resetbtn" onClick={handleReset}>
            Reset Password
          </button>
        </div>
      </div>
      <img src={Logo2} alt="logo" className="resetlogo2" />
    </div>
  );
};

export default ResetPassword;
