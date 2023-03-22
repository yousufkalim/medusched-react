import React, { FC } from 'react';
import Header from '../Header/Header';
import Pic1 from '../../assets/P1.png';
import Electives from '../HospitalDashboard/Electives';

import './Profile.css';

const Profile: FC = () => {
  return (
    <>
      <Header />
      <div className="HospitalprofileHeader">
        <div>
          <div className="HospitalprofileHeaderRow1">
            <img className="hospitalprofilepic" src={Pic1} alt="Pic1" />
            <p className="hospitalProfileName">Jersey City Medical Center</p>{' '}
          </div>
        </div>
      </div>
      <Electives title="All Electives" />
    </>
  );
};

export default Profile;
