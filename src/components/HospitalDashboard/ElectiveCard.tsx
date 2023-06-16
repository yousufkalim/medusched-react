import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import D1 from '../../assets/d1.svg';
import E1 from '../../assets/e1.svg';
// import Pic1 from '../../assets/P1.png';
import MenuI from '../../assets/Menu.svg';
import moment from 'moment';
import Elective from '../../types/elective';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteElectives from '../Modals/DeleteElective';
import EditElectives from '../Modals/EditElectives';
import api from '../../api/request';
import { Store } from '../../context/store';
import { mediaUrl } from '../../config';

interface IElectiveCard {
  title: string;
  item: Elective;
  getElectives?: () => void;
}
interface IElectiveResponse {
  elective: Elective;
  success: boolean;
}

const ElectiveCard: FC<IElectiveCard> = ({ title, item, getElectives }) => {
  const store = Store();
  const [deleteopen, setDeleteOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [editopen, setEditOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const handleDelete = (): void => {
    setLoading(true);
    api<IElectiveResponse>('put', `/electives/delete/${item?._id}`)
      .then((res) => {
        setLoading(true);
        if (getElectives) getElectives();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // const currentDate = new Date();
  // item && currentDate < new Date(item?.start_date) &&
  console.log('11instudent', item);
  const duration = item.students.some((student) => student.studentId === store?.user?._id)
    ? item.students.find((student) => student.studentId === store?.user?._id)?.duration ?? ''
    : '';

  console.log(
    'item.students.some((student) => student.studentId === store?.user?._id)',
    item.students.some((student) => student.studentId === store?.user?._id),
  );
  console.log("title === 'Applied Jobs'", title);
  return (
    <>
      {item.students.some((student) => student.studentId === store?.user?._id) &&
        title === 'Applied Jobs' && (
          <div key={item._id} className={`  electiveCard`}>
            <div className="logoDiv">
              {/* <img src={Pic1} alt="Pic1" /> */}
              <div className="electiveImages">
                <img
                  className="electivePics"
                  // src={`${mediaUrl}/${String(store?.user?.logo)}`}
                  src={`${mediaUrl}/${String(item?.hospital?.logo)}`}
                  alt="pic1"
                />
              </div>
              {item.students.some((student) => student.studentId === store?.user?._id) ? (
                <button className="appliedBtn">Applied</button>
              ) : (
                ''
              )}
            </div>
            <NavLink to={`/electives/${item._id}`}>
              <div className="headingDiv">
                <h1 className="heading1">{item?.title}</h1>
                {item?.limitenrollment ? (
                  <button
                    className={`${item.students.length === item?.limit ? 'EbtnLimit' : 'Ebtn'}`}
                  >
                    {item.students.length}/{item?.limit} reserved
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <div className="electivedesDiv">
                <p className="cardP1">
                  {item?.description.length > 300
                    ? item?.description.slice(0, 300) + '...'
                    : item?.description}
                </p>
              </div>
              <div className="btnDiv">
                <button className="dateBtn">{moment(item?.start_date).format('MM-DD-YYYY')}</button>
                <button className="dateBtn">{duration || item?.duration}</button>
              </div>
            </NavLink>
          </div>
        )}
      {!item.students.some((student) => student.studentId === store?.user?._id) &&
        title !== 'Applied Jobs' && (
          <div key={item._id} className={`  electiveCard`}>
            <div className="logoDiv">
              {/* <img src={Pic1} alt="Pic1" /> */}
              <div className="electiveImages">
                <img
                  className="electivePics"
                  src={`${mediaUrl}/${String(item?.hospital?.logo)}`}
                  alt="pic1"
                />
              </div>

              {store?.user?.role === 'Hospital' ? (
                <>
                  <button className="electiveMenuBtn" onClick={handleClick}>
                    <img src={MenuI} alt="MenuI" />
                  </button>
                </>
              ) : (
                <>
                  {/* {item.students.includes(store?.user?._id) ? (
                  <button className="appliedBtn">Applied</button>
                ) : (
                  ''
                )} */}
                </>
              )}
            </div>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <div className="maind1">
                <MenuItem
                  onClick={() => {
                    setEditOpen(true);
                  }}
                >
                  <img className="D1icon" src={E1} alt="Di" />
                  Edit
                </MenuItem>
              </div>
              <div className="maind1">
                <MenuItem
                  onClick={() => {
                    setDeleteOpen(true);
                  }}
                >
                  <img className="D1icon" src={D1} alt="Di" />
                  Delete
                </MenuItem>
              </div>
            </Menu>

            <NavLink to={`/electives/${item._id}`}>
              <div className="headingDiv">
                <h1 className="heading1">{item?.title}</h1>
                {item?.limitenrollment ? (
                  <button
                    className={`${item.students.length === item?.limit ? 'EbtnLimit' : 'Ebtn'}`}
                  >
                    {item.students.length}/{item?.limit} reserved
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <div className="electivedesDiv">
                <p className="cardP1">
                  {item?.description.length > 300
                    ? item?.description.slice(0, 300) + '...'
                    : item?.description}
                </p>
              </div>
              <div className="btnDiv">
                <button className="dateBtn">{moment(item?.start_date).format('MM-DD-YYYY')}</button>
                <button className="dateBtn">{item?.duration}</button>
              </div>
            </NavLink>
          </div>
        )}

      <DeleteElectives
        open={deleteopen}
        setOpen={setDeleteOpen}
        handleDelete={handleDelete}
        loading={loading}
      />
      <EditElectives
        getElectives={getElectives}
        open={editopen}
        setOpen={setEditOpen}
        elective={item}
      />
    </>
  );
};

export default ElectiveCard;
