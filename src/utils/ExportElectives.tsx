import React, { useState } from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Elective from '../types/elective';
import moment from 'moment';

// interface Elective {
//   title: string;
//   description: string;
//   duration: string;
// }
interface UpdatedElective {
  "Student's Name": string;
  'Student’s ID': string | undefined;
  // 'Hospital Name': string;
  // 'Elective Name': string;
  'Start Date': string;
  // 'End Date': string;
  Weeks: string;
}

interface Props {
  electives: Elective[];
  myHeader: string[];
}

const ExportElectives: React.FC<Props> = ({ electives, myHeader }) => {
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

  const handleSubmitExcel = (electives: Elective[]): void => {
    setLoading(true);
    if (electives?.length > 0) {
      const updatedelectives: UpdatedElective[] = [];
      electives.forEach((elective) => {
        const durationNumber = parseInt(elective?.duration);
        const startDate = moment(elective?.start_date);
        const endDate = startDate.add(durationNumber, 'weeks');
        elective.students.forEach((student) => {
          const updatedElective = {
            "Student's Name": student.studentId?.name ?? '',
            'Student’s ID': student?.studentId?.stdId,
            // 'Hospital Name': elective?.hospital?.name,
            // 'Elective Name': elective.title,
            'Start Date': moment(elective.start_date).format('MM-DD-YYYY'),
            'End Date': moment(endDate.toISOString()).format('MM-DD-YYYY'),
            Weeks: elective.duration.charAt(0),
          };
          updatedelectives.push(updatedElective);
        });
      });
      setLoading(false);
      exportToCSV(updatedelectives, 'Electives CSV');
    }
  };

  // Render
  return (
    <div className="d-flex justify-content-between ">
      <h3 className="mb-0"></h3>
      <button
        onClick={(e) => {
          handleSubmitExcel(electives);
        }}
        className="csvbtn1"
        disabled={loading}
      >
        {loading ? 'Loading..' : 'Export CSV'}
      </button>
    </div>
  );
};

export default ExportElectives;
