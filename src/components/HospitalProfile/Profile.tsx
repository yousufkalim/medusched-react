import React, { FC } from 'react';
import Header from '../Header/Header';
import Pic1 from '../../assets/P1.png';
import SortArrow1 from '../../assets/sortarrow1.svg';
import SortArrow2 from '../../assets/sortarrow2.svg';

import './Profile.css';

const Profile: FC = () => {
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
        <div className="hospitalcol2">
          <div className="Hosapplieddiv">
            <div className="applied1"> All Electives </div>
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
      </div>
    </>
  );
};

export default Profile;
