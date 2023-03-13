import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import Loginlogo from '../../assets/LoginLogo.svg';
import LoginImg from '../../assets/login.png';
import HidePassword from '../../assets/hidepass.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';
import api from '../../api/request';

const Login: FC = () => {
  const navigate = useNavigate();
  interface IUserObject {
    email: string;
    password: string;
    token?: string;
  }
  const [user, setUSer] = useState<IUserObject>({ email: '', password: '' });
  const [flag, setFlag] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUSer({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (user?.email === '') {
      toast.error('Email is Required');
    }
    if (user?.password === '') {
      toast.error('Password is Required');
    } else {
      console.log('formData', user);
      setLoading(true);
      void api('post', '/students/login', user)
        .then((res) => {
          console.log(res);
          if (res?.token) {
            console.log('settoken');
            localStorage.setItem('token', res.token);
            navigate('/electives');
            setLoading(false);
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
            <input
              className="loginInput"
              type={flag ? 'text' : 'password'}
              placeholder="*********"
              name="password"
              value={user?.password}
              onChange={handleChange}
            />
            <button
              onClick={() => {
                setFlag(!flag);
              }}
            >
              {' '}
              <img className="hidePassword" src={HidePassword} alt="hidepass" />
            </button>
            <div className="forgotdiv">
              {' '}
              <p className="forget">Forgot Password?</p>
            </div>
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
    </>
  );
};

export default Login;
