import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import Loginlogo from '../../assets/LoginLogo.svg';
import LoginImg from '../../assets/login.png';
import LoginImgMobile from '../../assets/login.svg';
import HidePassword from '../../assets/hidepass.svg';
import ShowPassword from '../../assets/showPassword.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';
import api from '../../api/request';
import ForgotPassword from '../Modals/ForgotPassword';

const Login: FC = () => {
  const navigate = useNavigate();
  interface IUserObject {
    email: string;
    password: string;
    token?: string;
    userRole?: string;
  }

  const [user, setUSer] = useState<IUserObject>({ email: '', password: '' });
  const [flag, setFlag] = useState<boolean>(false);
  const [openForgotPassword, setOpenForgotPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUSer({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    // const eduEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[Ee][Dd][Uu]$/;

    if (user?.email === '') {
      toast.error('Email is Required');
    } else if (user?.password === '') {
      toast.error('Password is Required');
    } else {
      setLoading(true);
      void api('post', '/students/login', user)
        .then((res) => {
          console.log(res?.userRole);

          if (res?.token) {
            localStorage.setItem('token', res.token);
            setLoading(false);
            if (res?.userRole === 'student') {
              navigate('/profile');
            } else {
              navigate('/students');
            }
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };
  return (
    <>
      <div className="logincol">
        <div className="loginrow1">
          <img className="LoginImg" src={LoginImg} alt="login" />
          <img className="LoginImgMobile" src={LoginImgMobile} alt="login" />
          <div className="textDiv">
            <img className="loginLogo" src={Loginlogo} alt="Logo" />
            <h2 className="loginH2">Welcome to MedUSched</h2>
            <p className="lopinP2">
              Revolutionize your medical residency planning with MedUSched - the ultimate solution
              for hassle-free scheduling of your electives!
            </p>
          </div>
        </div>
        <div className="loginrow2 ">
          <div className="loginDiv1">
            <h1 className="loginH1">Login</h1>
            <p className="loginP1"> Sign in to continue</p>
          </div>
          <div className="loginInputDiv">
            <p className="loginp">Email</p>
            <input
              className="loginInput"
              type="text"
              placeholder="e.g JohnDoe@gmail.com"
              name="email"
              value={user?.email}
              onChange={handleChange}
            />
          </div>
          <div className="loginInputDiv">
            <p className="loginp">Password</p>
            <div style={{ position: 'relative' }}>
              <input
                className="loginInput"
                type={flag ? 'text' : 'password'}
                placeholder="*********"
                name="password"
                value={user?.password}
                onChange={handleChange}
              />
              <img
                className="hidePassword"
                onClick={() => {
                  setFlag(!flag);
                }}
                src={flag ? ShowPassword : HidePassword}
                alt="hidepass"
              />
            </div>
            {/* <div className="forgotdiv">
              {' '}
              <button
                className="forget"
                onClick={() => {
                  setOpenForgotPassword(true);
                }}
              >
                Forgot Password?
              </button>
            </div> */}
          </div>
          <div className="loginbtnDiv">
            {loading ? (
              <button className="loginbtn">Loading...</button>
            ) : (
              <button className="loginbtn" onClick={handleSubmit}>
                Login
              </button>
            )}
          </div>
          <div className="p2div">
            <p className="p2">
              Don’t have an account?
              <NavLink to="/register">
                {' '}
                <span className="registerSpan">Register</span>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
      <ForgotPassword open={openForgotPassword} setOpen={setOpenForgotPassword} role="student" />
    </>
  );
};

export default Login;
