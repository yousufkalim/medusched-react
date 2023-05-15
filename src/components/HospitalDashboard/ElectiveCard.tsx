import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import D1 from '../../assets/d1.svg';
import E1 from '../../assets/e1.svg';
import Pic1 from '../../assets/P1.png';
import MenuI from '../../assets/Menu.svg';
import moment from 'moment';
import Elective from '../../types/elective';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteElectives from '../Modals/DeleteElective';
import EditElectives from '../Modals/EditElectives';
import api from '../../api/request';
import { Store } from '../../context/store';

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
    api<IElectiveResponse>('put', `/electives/delete/${item?._id}`)
      .then((res) => {
        if (getElectives) getElectives();
      })
      .catch(() => {
        // setLoading(false);
      });
  };

  // const currentDate = new Date();
  // item && currentDate < new Date(item?.start_date) &&

  return (
    <>
      {item.students.includes(store?.user?._id) && title === 'Applied Jobs' && (
        <div key={item._id} className={`  electiveCard`}>
          <div className="logoDiv">
            <img src={Pic1} alt="Pic1" />
            {item.students.includes(store?.user?._id) ? (
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
              <button className="dateBtn">{moment(item?.start_date).format('DD-MM-YYYY')}</button>
              <button className="dateBtn">{item?.duration}</button>
            </div>
          </NavLink>
        </div>
      )}
      {!item.students.includes(store?.user?._id) && title === 'Applied Jobs' && (
        <div className="noElectivefound">Currently not applied electives found.</div>
      )}
      {!item.students.includes(store?.user?._id) && title !== 'Applied Jobs' && (
        <div key={item._id} className={`  electiveCard`}>
          <div className="logoDiv">
            <img src={Pic1} alt="Pic1" />
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
              <button className="dateBtn">{moment(item?.start_date).format('DD-MM-YYYY')}</button>
              <button className="dateBtn">{item?.duration}</button>
            </div>
          </NavLink>
        </div>
      )}

      <DeleteElectives open={deleteopen} setOpen={setDeleteOpen} handleDelete={handleDelete} />
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
