import React, { FC } from 'react';
import Header from '../Header/Header';
import Electives from './Electives';
import './Dashboard.css';

const Dashboard: FC = () => {
  return (
    <div>
      <Header />
      <Electives />
    </div>
  );
};

export default Dashboard;
