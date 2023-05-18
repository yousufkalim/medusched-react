import React, { ChangeEvent, FC, FormEvent, useState, useEffect } from 'react';
import Loginlogo from '../../assets/LoginLogo.svg';
import LoginImg from '../../assets/login.png';
import LoginImgMobile from '../../assets/login.svg';
import HidePassword from '../../assets/hidepass.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/request';
import School from '../../types/school';
import './Login.css';

const Resgister: FC = () => {
  const navigate = useNavigate();
  interface IUserObject {
    name: string;
    email: string;
    school: string;
    domain: string;
    password: string;
    confirmpassword: string;
  }
  interface IUserSchool {
    schools: School[] | null;
    success: boolean;
  }

  const [formData, setFormData] = useState<IUserObject>({
    name: '',
    email: '',
    school: '',
    domain: '',
    password: '',
    confirmpassword: '',
  });
  const [password1, setPassword1] = useState<boolean>(false);
  const [password2, setPassword2] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [schools, setSchools] = useState<School[] | null>(null);

  const getSchools = (): void => {
    api<IUserSchool>('get', `/schools/forusers`)
      .then((res) => {
        setSchools(res.schools);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect((): void => {
    getSchools();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    if (name === 'school') {
      const selectedSchool = schools?.find((school) => school?._id === value);
      const domain = selectedSchool ? selectedSchool.domain_name : '';
      setFormData({ ...formData, [name]: value, domain });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex for email validation
    // const domain = formData?.domain?.toLowerCase(); // convert domain to uppercase for case-insensitive comparison
    const email = formData?.email?.toLowerCase(); // convert email to lowercase for case-insensitive comparison
    if (formData?.name === '') {
      toast.error('Name is Required');
    } else if (formData?.school === '') {
      toast.error('Please Select School');
    } else if (formData?.email === '') {
      toast.error('Email is Required');
    } else if (!emailRegex.test(email)) {
      toast.error('Invalid Email Format');
    }
    //  else if (!email.endsWith(`@${domain}.com`)|| !email.endsWith(`@${domain}.fr`)) {
    //   toast.error(`Email domain must be ${domain}.com`);
    // }
    else if (formData?.password === '') {
      toast.error('Password is Required');
    } else if (formData?.confirmpassword === '') {
      toast.error('Confirm Password is Required');
    } else if (formData?.confirmpassword !== formData?.password) {
      toast.error('Password Does not match');
    } else {
      setLoading(true);
      void api('post', '/students', formData)
        .then((res) => {
          toast('Registered Successfully.Check your Email');
          setFormData({
            name: '',
            email: '',
            school: '',
            domain: '',
            password: '',
            confirmpassword: '',
          });
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
          <img className="LoginImgMobile" src={LoginImgMobile} alt="login" />
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
            <p className="loginP1"> Sign up to continue</p>
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
            <p className="loginp">School</p>
            <select
              className="loginInput"
              name="school"
              value={formData?.school}
              onChange={handleChange}
            >
              <option value="">Select School</option>
              {schools?.map((school, index) => (
                <option key={index} value={school?._id}>
                  {school?.name}
                </option>
              ))}
            </select>
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
