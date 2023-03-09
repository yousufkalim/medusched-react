import React, { FC, useState, useEffect, useRef } from 'react';
import Logo from '../../assets/logo.svg';
import Person from '../../assets/Person.svg';
import menuIcon from '../../assets/menuIcon.svg';
import SortArrow1 from '../../assets/sortarrow1.svg';
import LogoutPic from '../../assets/logout.svg';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { Store, UpdateStore } from '../../context/store';

import './Header.css';

const Header1: FC = () => {
  const location = useLocation();
  const params = useParams();
  const path = location.pathname;
  console.log('path', params, path);
  const store = Store();
  const updateStore = UpdateStore();
  console.log('e', store?.user);
  const isLogin = localStorage.getItem('token');
  const [flag, setflag] = useState<boolean>(false);
  const [loginFlag, setloginFlag] = useState<boolean>(false);
  const handleLogout = (): void => {
    setloginFlag(false);
    if (updateStore) updateStore({ user: null });
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  };
  const routesArray = [
    // { name: 'Home', path: '/' },
    { name: 'Electives', path: '/electives' },
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
  console.log('headerName', headerName);
  return (
    <>
      <div className="headerContainer" ref={headerRef}>
        <div className="logoDiv">
          <div className="">
            <img src={Logo} alt="logo" />
          </div>
          <NavLink to="/">
            <h3 className="titlename">
              Med<span style={{ color: '#1D8DE2' }}>U</span>Sched
            </h3>
          </NavLink>
        </div>
        <div className="logoDiv">
          <h3 className="titlename">
            <span style={{ color: '#1D8DE2' }}>{headerName?.name ? headerName?.name : ''}</span>
          </h3>
        </div>
        {isLogin ? (
          <div className="loginNameDiv">
            <div className="line"></div>
            <div className="loginame">{store?.user?.name}</div>
            <button
              onClick={() => {
                setloginFlag(!loginFlag);
              }}
            >
              {' '}
              <img className="loginarrow" src={SortArrow1} alt="menuicon" />
            </button>
          </div>
        ) : (
          <div className="loginDiv">
            <NavLink to={'/login'}>
              {' '}
              <button className="loginSignupButton">
                Login/Signup <img src={Person} alt="a" />
              </button>
            </NavLink>
            <button
              onClick={() => {
                setflag(!flag);
              }}
            >
              <img className="menuIcon" src={menuIcon} alt="menuicon" />
            </button>
          </div>
        )}
      </div>
      {loginFlag && (
        <>
          <div className="logoutMainDiv">
            <div className="logoutElectives">
              <NavLink to="/electives">Electives</NavLink>
            </div>
            <div className="logoutBox">
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
