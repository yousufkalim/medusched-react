import React, { FC } from 'react';
import StudentDashboard from '../components/StudentDashboard/Dashboard';
import HospitalDashboard from '../components/HospitalDashboard/Dashboard';
import { Store } from '../context/store';

const Dashboard: FC = () => {
  const store = Store();
  return (
    <div>
      {store?.user?.role === 'Hospital' && <HospitalDashboard />}
      {store?.user?.role === 'student' && <StudentDashboard />}
    </div>
  );
};

export default Dashboard;
