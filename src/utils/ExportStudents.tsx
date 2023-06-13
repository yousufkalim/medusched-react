import React, { useState } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { IStudent } from '../types/user';
import moment from 'moment';

// interface Elective {
//   title: string;
//   description: string;
//   duration: string;
// }
interface UpdatedStudents {
  "Student's Name": string;

  // 'Hospital Name': string;
  // 'Elective Name': string;

  // 'End Date': string;
}

interface Props {
  students: IStudent[];
  myHeader: string[];
}

const ExportStudents: React.FC<Props> = ({ students, myHeader }) => {
  const [loading, setLoading] = useState<boolean>(false);
  // Exporting
  // File Type
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // Extension
  const fileExtension = '.xlsx';
  const exportToCSV = (csvData: object[], fileName: string): void => {
    // Setting cols width
    const wscols = [{ wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 30 }];
    // Sorting

    const ws = XLSX.utils.json_to_sheet(
      csvData,
      { header: myHeader },
      //   {
      //     alignment: {
      //       vertical: 'center',
      //       horizontal: 'center',
      //       wrapText: '1', // any truthy value here
      //     },
      //   },
    );
    ws['!cols'] = wscols;

    const wb = { Sheets: { users: ws }, SheetNames: ['users'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const eData = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(eData, fileName + fileExtension);
  };

  const handleSubmitExcel = (students: IStudent[]): void => {
    setLoading(true);
    if (students?.length > 0) {
      const updatedstudents: UpdatedStudents[] = [];
      students.forEach((student) => {
        const updatedStudents = {
          "Student's Name": student.name ? student.name : '',
          Email: student.email ?? '',
          'Contact No': student.phone ?? '',
          'Created At': moment(student.createdAt).format('MM-DD-YYYY'),
          Status: student.active ? 'Activated' : 'Inactivate',

          // 'Start Date': moment(elective.start_date).format('MM-DD-YYYY'),
        };
        updatedstudents.push(updatedStudents);
      });

      setLoading(false);
      console.log('updatedstudents', updatedstudents);
      exportToCSV(updatedstudents, 'Students CSV');
    }
  };

  // Render
  return (
    <div className="d-flex justify-content-between ">
      <h3 className="mb-0"></h3>
      <button
        onClick={(e) => {
          handleSubmitExcel(students);
        }}
        className="csvbtn1"
        disabled={loading}
      >
        {loading ? 'Loading..' : 'Export CSV'}
      </button>
    </div>
  );
};

export default ExportStudents;
