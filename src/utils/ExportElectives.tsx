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

interface Props {
  electives: Elective[] | any;
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
    const wscols = [{ wch: 40 }, { wch: 40 }, { wch: 40 }];
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

  // exporting excel
  const handleSubmitExcel = (electives: Elective[]): void => {
    console.log('Elective1111', electives);
    setLoading(true);
    if (electives?.length > 0) {
      const updatedelectives = electives.map((elective) => {
        return {
          // eslint-disable-next-line
          Student_name: elective?.students?.map((_) => `${_.name}`).join(', '),
          Hospital_name: elective?.hospital?.name,
          Elective_name: elective.title,
          Start_date: moment(elective.start_date).format('MM-DD-YYYY'),
          Duration: elective.duration,
        };
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
