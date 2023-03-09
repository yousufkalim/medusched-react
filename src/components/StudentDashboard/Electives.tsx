import React, { FC } from 'react';
import Pic1 from '../../assets/P1.png';
import { NavLink } from 'react-router-dom';
import SortArrow1 from '../../assets/sortarrow1.svg';
import SortArrow2 from '../../assets/sortarrow2.svg';

const Electives: FC = () => {
  const array = [
    {
      name: 'HIV_Clinic',
      img: Pic1,
      description:
        'Get hands-on experience in treating and managing HIV patients with the HIV Clinic elective at Jersey City Medical Center. Learn from experienced professionals and gain the knowledge and skills necessary to provide comprehensive care to those affected by HIV.',
      date: '22-01-2023',
      day: '2 Weeks',
      applied: false,
    },
    {
      name: 'HIV_Clinic',
      img: Pic1,
      description:
        'Get hands-on experience in treating and managing HIV patients with the HIV Clinic elective at Jersey City Medical Center. Learn from experienced professionals and gain the knowledge and skills necessary to provide comprehensive care to those affected by HIV.',
      date: '22-01-2023',
      day: '2 Weeks',
      applied: true,
    },
    {
      name: 'HIV_Clinic',
      img: Pic1,
      description:
        'Get hands-on experience in treating and managing HIV patients with the HIV Clinic elective at Jersey City Medical Center. Learn from experienced professionals and gain the knowledge and skills necessary to provide comprehensive care to those affected by HIV.',
      date: '22-01-2023',
      day: '2 Weeks',
      applied: false,
    },
    {
      name: 'HIV_Clinic',
      img: Pic1,
      description:
        'Get hands-on experience in treating and managing HIV patients with the HIV Clinic elective at Jersey City Medical Center. Learn from experienced professionals and gain the knowledge and skills necessary to provide comprehensive care to those affected by HIV.',
      date: '22-01-2023',
      day: '2 Weeks',
      applied: false,
    },
    {
      name: 'HIV_Clinic',
      img: Pic1,
      description:
        'Get hands-on experience in treating and managing HIV patients with the HIV Clinic elective at Jersey City Medical Center. Learn from experienced professionals and gain the knowledge and skills necessary to provide comprehensive care to those affected by HIV.',
      date: '22-01-2023',
      day: '2 Weeks',
      applied: false,
    },
  ];
  return (
    <>
      <div className="filterSection">
        <div className="filter1dashboard">
          <span style={{ color: 'gray', opacity: '0.6' }}>Sort by </span>
          <span className="n1"> Newest</span>
          <img className="SortArrow1D" src={SortArrow1} alt="SortArrow1" />
          <div className="divline1"></div>
          <img className="SortArrow2D" src={SortArrow2} alt="SortArrow1" />
        </div>
        <div className="electiveSection">
          {array.map((item, i) => (
            <div key={i} className="electiveCard">
              <NavLink key={i} to={`/electives/${item.name}`}>
                <div className="logoDiv">
                  <img src={item?.img} alt="Pic1" />
                  {item?.applied && <button className="appliedBtn">Applied</button>}
                </div>
                <div className="headingDiv">
                  <h1 className="heading1">{item?.name}</h1>
                  <button className="Ebtn">30/30 reserved</button>
                </div>
                <p className="cardP1">{item?.description}</p>
                <div className="btnDiv">
                  <button className="dateBtn">{item?.date}</button>
                  <button className="dateBtn">{item?.day}</button>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Electives;
