export default interface Elective {
  _id: string;
  hospital: string;
  //   schools: School[] | string[];
  //   students: Student[] | string[];
  title: string;
  description: string;
  start_date: Date;
  duration: string;
  limit: boolean;
  active: boolean;
}
