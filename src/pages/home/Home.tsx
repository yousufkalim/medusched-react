import React, { FC } from 'react';
import LandingPage from '../../components/LandingPage/LandingPage';
import apiAuth from '../../utils/common';

const Home: FC = () => {
  apiAuth();
  return <LandingPage />;
};

export default Home;
