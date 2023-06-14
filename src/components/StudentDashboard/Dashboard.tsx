import React, { FC } from 'react';
import Header from '../Header/Header';
import Electives from '../HospitalDashboard/Electives';
import './Dashboard.css';

const Dashboard: FC = () => {
  return (
    <div>
      <Header />
      <Electives title="Electives" />
    </div>
  );
};

export default Dashboard;
