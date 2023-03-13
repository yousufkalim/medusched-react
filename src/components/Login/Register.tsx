import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import Loginlogo from '../../assets/LoginLogo.svg';
import LoginImg from '../../assets/login.png';
import HidePassword from '../../assets/hidepass.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/request';
import './Login.css';

const Resgister: FC = () => {
  const navigate = useNavigate();
  interface IUserObject {
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
  }
  const [formData, setFormData] = useState<IUserObject>({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const [password1, setPassword1] = useState<boolean>(false);
  const [password2, setPassword2] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (formData?.name === '') {
      toast.error('Name is Required');
    } else if (formData?.email === '') {
      toast.error('Email is Required');
    } else if (formData?.password === '') {
      toast.error('Password is Required');
    } else if (formData?.confirmpassword === '') {
      toast.error('Confirm Password is Required');
    } else if (formData?.confirmpassword !== formData?.password) {
      toast.error('Password Does not match');
    } else {
      setLoading(true);
      void api('post', '/students', formData)
        .then((res) => {
          toast('Student Created Successfully');
          console.log(res);
          setFormData({ name: '', email: '', password: '', confirmpassword: '' });
          navigate('/login');
          setLoading(false);
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
            <h2 className="loginH2">Join MedUSched today</h2>
            <p className="lopinP2">
              Our mission is to empower medical students to become competent physicians by making
              scheduling clinical rotations stress-free.
            </p>
          </div>
        </div>
        <div className="loginrow2 ">
          <div className="loginDiv1">
            <h1 className="loginH1">Register Your Account</h1>
            <p className="loginP1"> Signup to continue</p>
          </div>
          <div className="loginInputDiv">
            <p className="loginp">Full Name</p>
            <input
              className="loginInput"
              type="text"
              placeholder="e.g John Doe"
              name="name"
              value={formData?.name}
              onChange={handleChange}
            />
          </div>
          <div className="loginInputDiv">
            <p className="loginp">Email</p>
            <input
              className="loginInput"
              type="text"
              placeholder="e.g JohnDoe@gmail.com"
              name="email"
              value={formData?.email}
              onChange={handleChange}
            />
          </div>
          <div className="loginInputDiv">
            <p className="loginp">Password</p>
            <input
              className="loginInput"
              type={password1 ? 'text' : 'password'}
              placeholder="*********"
              name="password"
              value={formData?.password}
              onChange={handleChange}
            />
            <button
              onClick={() => {
                setPassword1(!password1);
              }}
            >
              {' '}
              <img className="hidePassword1" src={HidePassword} alt="hidepass" />
            </button>
          </div>
          <div className="loginInputDiv">
            <p className="loginp">Confirm Password</p>
            <input
              className="loginInput"
              type={password2 ? 'text' : 'password'}
              placeholder="*********"
              name="confirmpassword"
              value={formData?.confirmpassword}
              onChange={handleChange}
            />
            <button
              onClick={() => {
                setPassword2(!password2);
              }}
            >
              {' '}
              <img className="hidePassword2" src={HidePassword} alt="hidepass" />
            </button>
          </div>
          <div className="loginbtnDiv">
            {loading ? (
              <button className="loginbtn">Loading...</button>
            ) : (
              <button className="loginbtn" onClick={handleSubmit}>
                Register
              </button>
            )}
          </div>
          <div className="p2div">
            <p className="p2">
              Already have an account?
              <NavLink to="/login">
                {' '}
                <span className="registerSpan">Login</span>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resgister;
