import React, { FC, useState } from 'react';
import Header from '../Header/Header';
import { Store } from '../../context/store';
import Electives from '../HospitalDashboard/Electives';
import Profilelogo from '../../assets/profilelogo.svg';
import StudentProfile from '../Modals/StudentProfile';
import './Profile.css';
const Profile: FC = () => {
  const store = Store();
  const [open, setOpen] = useState<boolean>(false);
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
          <button
            className="editProfileBtn"
            onClick={(): void => {
              setOpen(true);
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <Electives title="Applied Jobs" />
      <StudentProfile open={open} setOpen={setOpen} student={store?.user} />
    </>
  );
};

export default Profile;
