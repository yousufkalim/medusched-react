import React, { FC, useState, useEffect, useRef } from 'react';
import Logo from '../../assets/logo.svg';
import Pic1 from '../../assets/P1.png';
import Person from '../../assets/Person.svg';
import SortArrow1 from '../../assets/sortarrow1.svg';
import LogoutPic from '../../assets/logout.svg';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { Store, UpdateStore } from '../../context/store';

import './Header.css';

const Header1: FC = () => {
  const location = useLocation();
  const params = useParams();
  const path = location.pathname;
  const store = Store();
  const updateStore = UpdateStore();
  const isLogin = localStorage.getItem('token');
  const [loginFlag, setloginFlag] = useState<boolean>(false);
  const handleLogout = (): void => {
    setloginFlag(false);
    if (updateStore) updateStore({ user: null });
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  };
  const routesArray = [
    // { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Electives', path: '/electives' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Electives Details', path: `/electives/${params?.id ?? ''}` },
  ];

  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setloginFlag(false);
      }
    };

    if (loginFlag) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [loginFlag]);

  const headerName = routesArray.find((route) => route.path === path);
  return (
    <>
      <div className="headerContainer" ref={headerRef}>
        {/* <NavLink to="/"> */}
        <div className="logoDivHeader">
          <div className="">
            <img src={Logo} alt="logo" />
          </div>

          <h3 className="titlename logoname">
            Med<span style={{ color: '#1D8DE2' }}>U</span>Sched
          </h3>
        </div>
        {/* </NavLink> */}
        <div className="logoDivHeader">
          <h3 className="titlename">
            <span style={{ color: '#1D8DE2' }}>{headerName?.name ? headerName?.name : ''}</span>
          </h3>
        </div>
        {isLogin ? (
          <div className="loginNameDiv">
            {store?.user?.role === 'Hospital' ? (
              <img className="hospitalheaderlogo" src={Pic1} alt="menuicon" />
            ) : (
              <div className="line"></div>
            )}

            <button
              onClick={() => {
                setloginFlag(!loginFlag);
              }}
              className="nbtn"
            >
              <div className="loginame">{store?.user?.name}</div>{' '}
              <img className="loginarrow" src={SortArrow1} alt="menuicon" />
            </button>
          </div>
        ) : (
          <div className="loginBtnDiv1">
            <NavLink to={'/hospitallogin'}>
              {' '}
              <button className="loginSignupButtonH">
                <span className="hideresponsiv">Hospital </span>Login
              </button>
            </NavLink>
            <NavLink to={'/login'}>
              {' '}
              <button className="loginSignupButton">
                Login/Signup <img src={Person} alt="a" />
              </button>
            </NavLink>
          </div>
        )}
      </div>
      {loginFlag && (
        <>
          <div className="logoutMainDiv">
            <NavLink to="/profile">
              <div className="logoutElectives">Profile</div>
            </NavLink>
            <NavLink to="/electives">
              <div className="logoutElectives">Electives</div>
            </NavLink>
            <div className="logoutElectives">
              <button className="logoutbtn" onClick={handleLogout} style={{ fontWeight: '600' }}>
                <img className="loginarrow" src={LogoutPic} alt="menuicon" /> Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header1;
