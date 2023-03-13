import React, { FC } from 'react';
import Header from '../Header/Header';
import Pic1 from '../../assets/P1.png';
import Loc from '../../assets/loc.svg';

const SingleElective: FC = () => {
  return (
    <>
      <Header />
      <div className="singleElectiveContainer">
        <div className="singleElectiveHeading">
          <img src={Pic1} alt="Pic1" />
          <p className="electivetitle">Jersey City Medical Center</p>
        </div>
        <div className="singleElectiveBody">
          <h1 className="heding1">HIV Clinic</h1>
          <div className="singleloc">
            <div className="loc1">
              {' '}
              <img src={Loc} alt="Pic1" />
              <span style={{ color: '#1d8de2', margin: '0px 3px' }}>Patreon </span>
              <span style={{ color: 'gray' }}> London town, MD </span>
            </div>
            <div className="datediv">
              {' '}
              <span style={{ color: 'gray' }}>Posted 8 Days ago </span>
              <span style={{ color: '#1d8de2', margin: '0px 3px' }}>86 Applicant</span>
            </div>
          </div>
          <p className="singleP1">
            <span style={{ color: '#1d8de2', margin: '0px 2px' }}>
              {' '}
              Description <br className="singlebr"></br>-{' '}
            </span>
            Get hands-on experience in treating and managing HIV patients with the HIV Clinic
            elective at Jersey City Medical Center. Learn from experienced professionals and gain
            the knowledge and skills necessary to provide comprehensive care to those affected by
            HIV.
          </p>
          <div className="singlebtnDiv">
            <button>
              <span style={{ color: 'gray', margin: '0px 5px' }}>Start Date</span>12 - 05 - 2023
            </button>
            <div className="btndiv2"></div>
            <button>
              <span style={{ color: 'gray', margin: '0px 5px' }}>Duration</span>2 Weeks
            </button>
          </div>
        </div>
      </div>
      <div className="singlereservebtnDiv">
        <button className="singleReservebtn">Reserve</button>
      </div>
    </>
  );
};

export default SingleElective;
