import React, { FC } from 'react';
import StudentDashboard from '../components/StudentDashboard/Dashboard';
import HospitalDashboard from '../components/HospitalDashboard/Dashboard';
import { Store } from '../context/store';
import SchoolDashboard from '../components/SchoolDashboard/SchoolDashboard';

const Dashboard: FC = () => {
  const store = Store();
  return (
    <div>
      {store?.user?.role === 'Hospital' && <HospitalDashboard />}
      {store?.user?.role === 'student' && <StudentDashboard />}
      {store?.user?.role === 'school' && <SchoolDashboard />}
    </div>
  );
};

export default Dashboard;
