import School from './school';
export default interface User {
  _id?: string;
  studentId?: string;
  name?: string;
  logo?: string;
  email?: string;
  password?: string;
  phone?: string;
  gender?: string;
  electives?: any[];
  school: School | string;
  role?: string;
  address?: string;
  city?: string;
  country?: string;
  photo?: string;
  acceptcondition?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
