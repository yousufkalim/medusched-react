export default interface User {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  gender?: string;
  electives?: any[];
  role?: string;
  address?: string;
  city?: string;
  country?: string;
  photo?: string;
  acceptcondition?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
