import React, { FC, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Pic1 from '../../assets/P1.png';
import SortArrow1 from '../../assets/sortarrow1.svg';
import SortArrow2 from '../../assets/sortarrow2.svg';
import { Store } from '../../context/store';
import api from '../../api/request';
import User from '../../types/user';

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
  const array = [
    {
      name: 'HIV Clinic',
      img: Pic1,
      description:
        'Get hands-on experience in treating and managing HIV patients with the HIV Clinic elective at Jersey City Medical Center. Learn from experienced professionals and gain the knowledge and skills necessary to provide comprehensive care to those affected by HIV.',
      date: '22-01-2023',
      day: '2 Weeks',
      applied: true,
    },
    {
      name: 'HIV Clinic',
      img: Pic1,
      description:
        'Get hands-on experience in treating and managing HIV patients with the HIV Clinic elective at Jersey City Medical Center. Learn from experienced professionals and gain the knowledge and skills necessary to provide comprehensive care to those affected by HIV.',
      date: '22-01-2023',
      day: '2 Weeks',
      applied: true,
    },
    {
      name: 'HIV Clinic',
      img: Pic1,
      description:
        'Get hands-on experience in treating and managing HIV patients with the HIV Clinic elective at Jersey City Medical Center. Learn from experienced professionals and gain the knowledge and skills necessary to provide comprehensive care to those affected by HIV.',
      date: '22-01-2023',
      day: '2 Weeks',
      applied: true,
    },
    {
      name: 'HIV Clinic',
      img: Pic1,
      description:
        'Get hands-on experience in treating and managing HIV patients with the HIV Clinic elective at Jersey City Medical Center. Learn from experienced professionals and gain the knowledge and skills necessary to provide comprehensive care to those affected by HIV.',
      date: '22-01-2023',
      day: '2 Weeks',
      applied: true,
    },
    {
      name: 'HIV Clinic',
      img: Pic1,
      description:
        'Get hands-on experience in treating and managing HIV patients with the HIV Clinic elective at Jersey City Medical Center. Learn from experienced professionals and gain the knowledge and skills necessary to provide comprehensive care to those affected by HIV.',
      date: '22-01-2023',
      day: '2 Weeks',
      applied: true,
    },
  ];
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
      <div className="filterSection1">
        <div className="applieddiv">
          <div className="applied1"> Applied Jobs</div>
          <div className="filter1">
            <span style={{ color: 'gray' }}>Sort by </span>
            <span className="n1"> Newest</span>
            <img className="SortArrow1" src={SortArrow1} alt="SortArrow1" />
            <div className="divline1"></div>
            <img className="SortArrow2" src={SortArrow2} alt="SortArrow1" />
          </div>
        </div>
        <div className="electiveSection">
          {array.map((item, i) => (
            <div key={i} className="electiveCard">
              <div className="logoDiv">
                <img src={item?.img} alt="Pic1" />
                {item?.applied && <button className="appliedBtn">Applied</button>}
              </div>
              <div className="headingDiv">
                <h1 className="heading1">{item?.name}</h1>
              </div>
              <p className="cardP1">{item?.description}</p>
              <div className="btnDiv">
                <button className="dateBtn">{item?.date}</button>
                <button className="dateBtn">{item?.day}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
