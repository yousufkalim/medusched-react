import React, { FC } from 'react';
import Header from '../Header/Header';
// import Pic1 from '../../assets/P1.png';
import Electives from '../HospitalDashboard/Electives';
import { Store } from '../../context/store';
import { mediaUrl } from '../../config';

import './Profile.css';

const Profile: FC = () => {
  const store = Store();
  console.log('mediaUrl', `${mediaUrl}/${String(store?.user?.logo)}`);

  return (
    <>
      <Header />
      <div className="HospitalprofileHeader">
        <div>
          <div className="HospitalprofileHeaderRow1">
            <img
              className="hospitalprofilepic"
              src={`${mediaUrl}/${String(store?.user?.logo)}`}
              alt="Pic1"
            />
            <p className="hospitalProfileName">{store?.user?.name}</p>{' '}
          </div>
        </div>
      </div>
      <Electives title="All Electives" />
    </>
  );
};

export default Profile;
