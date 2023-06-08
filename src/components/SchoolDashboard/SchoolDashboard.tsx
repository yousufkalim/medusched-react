import React, { FC, useState, useEffect } from 'react';
import Header from '../Header/Header';
import './SchoolDashboard.css';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
import moment from 'moment';
import api from '../../api/request';
import { IStudent, IResponse } from '../../types/user';
import { toast } from 'react-toastify';

const SchoolDashboard: FC = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
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

  const handleActivate = (student: { _id: string }): void => {
    api('put', `students/activate/${student?._id}`, { active: true })
      .then(() => {
        toast.success('Status Updated successfully');
        getStudents();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInActivate = (student: { _id: string }): void => {
    api('put', `students/activate/${student?._id}`, { active: false })
      .then(() => {
        toast.success('Status Updated successfully');
        getStudents();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(students);
  return (
    <>
      <Header />
      <div className="schoolDashboard">
        <div className="schoolDashboard_data">
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
                        handleActivate(item);
                      }}
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      className={!item.active ? 'button_inactive' : 'button_unactive'}
                      onClick={() => {
                        handleInActivate(item);
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
    </>
  );
};

export default SchoolDashboard;
