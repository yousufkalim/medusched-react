import React, { FC } from 'react';
import Header from '../Header/Header';
import About from './About';
import BodySection from './BodySection';
import Contact from './Contact';

import './LandingPage.css';
import Partners from './Partners';

const LandingPage: FC = () => {
  return (
    <div>
      <Header />
      <BodySection />
      <Partners />
      <About />
      <Contact />
    </div>
  );
};

export default LandingPage;
