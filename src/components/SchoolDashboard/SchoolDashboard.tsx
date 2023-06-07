import React, { FC, useState } from 'react';
import Header from '../Header/Header';
// import DownloadLogo from '../../assets/Download.svg';
import './SchoolDashboard.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const data = [
  {
    name: 'Luca',
    email: 'abcd@umt.com',
    phone: '+1 (223) 123-4463',
    date: 'Wed May 17 2023',
    isActive: true,
  },
  {
    name: 'Luca',
    email: 'abcd@umt.com',
    phone: '+1 (223) 123-4463',
    date: 'Wed May 17 2023',
    isActive: true,
  },
  {
    name: 'Luca',
    email: 'abcd@umt.com',
    phone: '+1 (223) 123-4463',
    date: 'Wed May 17 2023',
    isActive: true,
  },
  {
    name: 'Luca',
    email: 'abcd@umt.com',
    phone: '+1 (223) 123-4463',
    date: 'Wed May 17 2023',
    isActive: false,
  },
  {
    name: 'Luca',
    email: 'abcd@umt.com',
    phone: '+1 (223) 123-4463',
    date: 'Wed May 17 2023',
    isActive: false,
  },
  {
    name: 'Luca',
    email: 'abcd@umt.com',
    phone: '+1 (223) 123-4463',
    date: 'Wed May 17 2023',
    isActive: true,
  },
  {
    name: 'Luca',
    email: 'abcd@umt.com',
    phone: '+1 (223) 123-4463',
    date: 'Wed May 17 2023',
    isActive: true,
  },
  {
    name: 'Luca',
    email: 'abcd@umt.com',
    phone: '+1 (223) 123-4463',
    date: 'Wed May 17 2023',
    isActive: true,
  },
  {
    name: 'Luca',
    email: 'abcd@umt.com',
    phone: '+1 (223) 123-4463',
    date: 'Wed May 17 2023',
    isActive: false,
  },
];
const SchoolDashboard: FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [inActive, setInactive] = useState(false);

  const ActiveClick = (): void => {
    setIsActive(!isActive);
  };

  const InActiveClick = (): void => {
    setInactive(!inActive);
  };

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
              {data.map((item, index) => (
                <tr className="schoolDashboard_table_body_data" key={index}>
                  <td className="schoolDashboard_table_body_name">{item.name}</td>
                  <td className="schoolDashboard_table_body_txt">{item.email}</td>
                  <td className="schoolDashboard_table_body_txt">{item.phone}</td>
                  <td className="schoolDashboard_table_body_txt">{item.date}</td>
                  <td className="schoolDashboard_table_body_btns">
                    <button
                      type="button"
                      className={item.isActive ? 'button_active' : 'button_unactive'}
                      onClick={ActiveClick}
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      className={!item.isActive ? 'button_inactive' : 'button_unactive'}
                      onClick={InActiveClick}
                    >
                      Inactive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Stack className="pagination_data">
          <p className="pagination_txt">Showing item(s) 1-09 of 170</p>
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            siblingCount={0}
            boundaryCount={1}
          />
        </Stack>
      </div>
    </>
  );
};

export default SchoolDashboard;
