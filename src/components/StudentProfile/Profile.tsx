import React, { FC, useEffect, useState } from 'react';
import Header from '../Header/Header';

import { Store } from '../../context/store';
import api from '../../api/request';
import User from '../../types/user';
import Electives from '../HospitalDashboard/Electives';

import Profilelogo from '../../assets/profilelogo.svg';
import './Profile.css';
interface IUser {
  student?: User | null;
}

const Profile: FC = () => {
  const store = Store();
  const [loading, setLoading] = useState<boolean>(false);
  const [appliedElectives, setAppliedEllectives] = useState<User | null>(null);
  console.log(loading);

  useEffect(() => {
    getUserWithelectives();
  }, []);
  const getUserWithelectives = (): void => {
    setLoading(true);
    api<IUser>('get', `/students/${store?.user?._id ? store?.user?._id : ''}`)
      .then((res) => {
        console.log('res is', res);
        if (res?.student) {
          setAppliedEllectives(res.student);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  console.log('appliedElectives', appliedElectives);
  return (
    <>
      <Header />
      <div className="profileHeader">
        <div className="profileHeaderRow1">
          <p className="Stdname1">Younus Akram</p>
          <p className="email1">younus@rjms.edu</p>{' '}
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
