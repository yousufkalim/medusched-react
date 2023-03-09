import React, { FC } from 'react';
import about1 from '../../assets/about1.png';
import about2 from '../../assets/about2.png';
import about3 from '../../assets/about3.png';

const About: FC = () => {
  return (
    <>
      <div>
        <h1 className="aboutHeading">
          About <span style={{ color: '#1D8DE2' }}>MedUSched</span>
        </h1>
      </div>
      <div className="aboutrow1">
        <div className="aboutcol1">
          <img className="aboutimg" src={about1} alt="about1" />
        </div>
        <div className="aboutcol2">
          <h2 className="aboutH2">
            <span style={{ color: '#1D8DE2' }}>Efficient </span>
            <br className="breakline" />
            Onbording
          </h2>

          <p className="aboutP">
            Access to up-to-date elective availability, at any given hospital, at any given time. No
            more waiting on emails and being put on hold to reserve an elective. Now you can
            schedule the best electives to fit your medical residency goals with just a few clicks!
          </p>
        </div>
      </div>

      <div className="aboutrow2">
        <div className="aboutcol1">
          <img className="aboutimg" src={about2} alt="about1" />
        </div>
        <div className="about2col2">
          <h2 className="aboutH2">
            Our Healthcare
            <br className="breakline" />
            <span style={{ color: '#1D8DE2' }}> Mission</span>
          </h2>

          <p className="about2p">
            &quot;Empowering medical students to plan their own paths to becoming competent
            physicians.&quot;
          </p>
          <p className="aboutP">
            Our goal is to partner with medical schools and their affiliate hospitals to make the
            burdens of scheduling clinical rotations obsolete for both medical students and clinical
            coordinators
          </p>
        </div>
      </div>

      <div className="aboutrow1">
        <div className="aboutcol1">
          <img className="aboutimg" src={about3} alt="about1" />
        </div>
        <div className="aboutcol2">
          <h2 className="aboutH2">
            <span style={{ color: '#1D8DE2' }}>Elective </span>Roster
            <br className="breakline" />
            Tracking
          </h2>

          <p className="aboutP">
            Set up your electives across multiple hospitals without fear of overlapping schedules.
            Keep track of where you&apos;ve been and where you&apos;re heading on your path to
            graduation. Now you can fulfill your graduation requirements with ease
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
