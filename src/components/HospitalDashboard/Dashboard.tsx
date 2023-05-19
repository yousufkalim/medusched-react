import React, { FC, useEffect } from 'react';
import Header from '../Header/Header';
import Electives from './Electives';
import './Dashboard.css';

const Dashboard: FC = () => {
  useEffect(() => {
    document.title = 'MedUSched - Dashboard'; // Update the document title
  }, []);
  return (
    <div>
      <Header />
      <Electives title="List of Electives" />
    </div>
  );
};

export default Dashboard;
