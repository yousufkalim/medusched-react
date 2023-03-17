export default interface Elective {
  _id: string;
  hospital: string;
  schools: any[];
  students: any[];
  title: string;
  description: string;
  start_date: Date;
  duration: string;
  limit: boolean;
  active: boolean;
}

// export interface Elective {
//   _id: string;
//   hospital: string;
//   schools: any[];
//   students: any[];
//   title: string;
//   description: string;
//   start_date: string;
//   duration: string;
//   limit: boolean;
//   active: boolean;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }
// export interface ElectiveResponse {
//   success: boolean;
//   elective?: Elective;
//   electives?: Elective[];
// }
