import School from './school';

export interface IStudent {
  _id: string;
  email: string;
  name: string;
  phone?: string;
  active?: boolean;
  createdAt: Date;
}
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
export interface IResponse {
  students: IStudent[];
  success: boolean;
}
