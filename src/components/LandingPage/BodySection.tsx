import React, { FC } from 'react';
import BodyImg from '../../assets/Bodyimg.svg';
import Logo from '../../assets/logo.svg';
import RightArrow from '../../assets/RightArrow.svg';

const BodySection: FC = () => {
  return (
    <>
      <div className="bodySection">
        <div className="bodycol1">
          <img className="logo1" src={Logo} alt="logo" />
          <h2 className="col1Heading">
            Never stress about scheduling 4th year electives{' '}
            <span style={{ color: '#1D8DE2' }}> again!</span>
          </h2>

          <p className="textdescription">
            Experience the ease of scheduling your medical electives and planning your path to
            becoming a competent physician with MedUSched. Sign up now to access up-to-date elective
            availability and track your progress towards graduation.
          </p>
          <button className="schedualebtn">Start Scheduling</button>
        </div>
        <div className="bodycol2">
          <button className="startbtn">
            Start Now <img className="RightArrow" src={RightArrow} alt="RightArrow" />
          </button>
          <img className="bodyimg" src={BodyImg} alt="a" />
        </div>
      </div>
    </>
  );
};

export default BodySection;
