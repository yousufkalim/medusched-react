import React, { FC } from 'react';
import StudentProfile from '../components/StudentProfile/Profile';
import HospitalProfile from '../components/HospitalProfile/Profile';

import { Store } from '../context/store';
const Profile: FC = () => {
  const store = Store();
  return (
    <div>
      {store?.user?.role === 'student' && <StudentProfile />}
      {store?.user?.role === 'Hospital' && <HospitalProfile />}
    </div>
  );
};

export default Profile;
