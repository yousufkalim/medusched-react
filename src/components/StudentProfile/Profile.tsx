import React, { FC } from 'react';
import Header from '../Header/Header';
import { Store } from '../../context/store';
import Electives from '../HospitalDashboard/Electives';
import Profilelogo from '../../assets/profilelogo.svg';
import './Profile.css';
const Profile: FC = () => {
  const store = Store();
  return (
    <>
      <Header />
      <div className="profileHeader">
        <div className="profileHeaderRow1">
          <p className="Stdname1">{store?.user?.name}</p>
          <p className="email1">{store?.user?.email}</p>{' '}
        </div>
        <div className="profileHeaderRow2">
          <img src={Profilelogo} alt="Profilelogo" />
        </div>
      </div>
      <Electives title="Applied Jobs" />
    </>
  );
};

export default Profile;
