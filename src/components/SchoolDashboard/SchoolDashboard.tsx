import React, { FC, useState, useEffect } from 'react';
import Header from '../Header/Header';
import './SchoolDashboard.css';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
import moment from 'moment';
import api from '../../api/request';
import { IStudent, IResponse } from '../../types/user';
import ActivateUser from '../Modals/ActivateUser';
import InActivateUser from '../Modals/InActivateUser';
import ExportStudents from '../../utils/ExportStudents';
import { toast } from 'react-toastify';

const SchoolDashboard: FC = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openInActive, setOpenInActive] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const getStudents = (): void => {
    api<IResponse>('get', 'students/schoolStudents')
      .then((res) => {
        setStudents(res?.students);
      })
      .catch(() => {
        // setLoading(false);
      });
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleActivate = (): void => {
    api('put', `students/activate/${selectedStudent?._id as string}`, { active: true })
      .then(() => {
        toast.success('Status Updated successfully');
        getStudents();
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInActivate = (): void => {
    api('put', `students/activate/${selectedStudent?._id as string}`, { active: false })
      .then(() => {
        toast.success('Status Updated successfully');
        getStudents();
        setOpenInActive(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log('selectedStudent', selectedStudent);
  const myHeader = ["Student's Name", 'Email', 'Contact No', 'Created At', 'Status'];
  return (
    <>
      <Header />
      <div className="schoolDashboard">
        <div className="schoolDashboard_data">
          <div className="CsvDiv">
            <ExportStudents students={students} myHeader={myHeader} />
          </div>
          <table className="schoolDashboard_table">
            <thead className="schoolDashboard_table_heading">
              <tr>
                <th className="schoolDashboard_table_heading_txt schoolDashboard_borderleft">
                  Name
                </th>
                <th className="schoolDashboard_table_heading_txt">Email</th>
                <th className="schoolDashboard_table_heading_txt">Contact No</th>
                <th className="schoolDashboard_table_heading_txt">Created Date</th>
                <th className="schoolDashboard_table_heading_txt_at">Status</th>
              </tr>
            </thead>

            <tbody className="schoolDashboard_table_body">
              {students?.map((item: any) => (
                <tr className="schoolDashboard_table_body_data" key={item._id}>
                  <td className="schoolDashboard_table_body_name">{item.name}</td>
                  <td className="schoolDashboard_table_body_txt">{item.email}</td>
                  <td className="schoolDashboard_table_body_txt">{item.phone}</td>
                  <td className="schoolDashboard_table_body_txt">
                    {moment(item?.createdAt).format('ddd MMMM DD YYYY')}
                  </td>
                  <td className="schoolDashboard_table_body_btns">
                    <button
                      type="button"
                      className={item.active ? 'button_active' : 'button_unactive'}
                      onClick={() => {
                        setSelectedStudent(item);
                        setOpen(true);
                      }}
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      className={!item.active ? 'button_inactive' : 'button_unactive'}
                      onClick={() => {
                        setSelectedStudent(item);
                        setOpenInActive(true);
                      }}
                    >
                      Inactive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <Stack className="pagination_data">
          <p className="pagination_txt">Showing item(s) 1-09 of {students.length}</p>
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            siblingCount={0}
            boundaryCount={1}
          />
        </Stack> */}
      </div>
      <ActivateUser
        open={open}
        setOpen={setOpen}
        setSelectedStudent={setSelectedStudent}
        handleActivateStudent={handleActivate}
      />
      <InActivateUser
        open={openInActive}
        setOpen={setOpenInActive}
        setSelectedStudent={setSelectedStudent}
        handleInActivateStudent={handleInActivate}
      />
    </>
  );
};

export default SchoolDashboard;
