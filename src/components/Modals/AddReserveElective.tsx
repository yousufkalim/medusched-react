// import * as React from 'react';
import React, { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Checkbox } from '@material-ui/core';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../api/request';
import { toast } from 'react-toastify';
import './ReserveElective.css';
// import { Store, UpdateStore } from '../../context/store';
// import Elective from '../../types/elective';
import User from '../../types/user';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface IUserObject {
  name?: string;
  email?: string;
  phone?: string;
  stdId?: string;
  acceptCondition?: boolean;
  electiveId?: string;
  studentId?: string;
  user?: User;
}

interface IBasicModal {
  open: boolean;
  setOpen: (open: boolean) => void;
  electiveId: string;
  user?: User;
  getSingleElectives?: () => void;
}
const AddReserveElective: FC<IBasicModal> = ({
  open,
  setOpen,
  electiveId,
  user,
  getSingleElectives,
}) => {
  // const updateStore = UpdateStore();
  // const store = Store();
  const [userData, setUserData] = useState<IUserObject>({
    name: '',
    email: '',
    phone: '',
    stdId: '',
  });

  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  console.log('loading ', loading);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user?.name ? user?.name : '',
        email: user?.email ? user?.email : '',
        phone: user?.phone ? user?.phone : '',
        stdId: user?._id ? user?._id : '',
      });
    }
  }, [user, open]);

  //   Onchange funtions
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCheckbox(event.target.checked);
  };

  //   End

  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (userData?.name === '') {
      toast.error('Name is Required');
    } else if (userData?.email === '') {
      toast.error('Email is Required');
    } else if (userData?.phone === '') {
      toast.error('Phone is Required');
    } else if (userData?.studentId === '') {
      toast.error('Student id is Required');
    } else if (!checkbox) {
      toast.error('Please accept cancellation policy');
    } else {
      setLoading(true);
      void api<IUserObject>('put', `/electives/applyelective`, {
        name: userData?.name,
        // email: userData?.email,
        phone: userData?.phone,
        // acceptCondition: userData?.acceptCondition,
        electiveId,
        studentId: user?._id,
      })
        .then((res) => {
          if (getSingleElectives) {
            getSingleElectives();
          }
          setOpen(false);
          setLoading(false);
          toast.success('Applied Successfully');
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };
  const list = (anchor: Anchor): JSX.Element => (
    <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 600 }} role="presentation">
      <h1 className="addelectivesh1">Add Your Details</h1>
      <h2 className="addelectivesh2">Fill out the form to apply for this position.</h2>
      <div className="electiveInputDiv">
        <p className="addelectivep">Full Name</p>
        <input
          className="addelectiveInput"
          type="text"
          placeholder="Full Name"
          name="name"
          value={userData?.name}
          onChange={handleChange}
        />
      </div>
      <div className="electiveInputDiv">
        <p className="addelectivep">Email</p>
        <input
          className="addelectiveInput"
          type="text"
          placeholder="Add Your Email"
          name="email"
          value={userData?.email}
          onChange={handleChange}
          disabled
        />
      </div>
      <div className="electiveInputDiv">
        <p className="addelectivep">Phone</p>
        <input
          className="addelectiveInput"
          type="text"
          placeholder="Add Your Phone "
          name="phone"
          value={userData?.phone}
          onChange={handleChange}
        />
      </div>
      <div className="electiveInputDiv">
        <p className="addelectivep">Student ID</p>
        <input
          className="addelectiveInput"
          type="text"
          placeholder="Add Student Id"
          name="stdId"
          value={userData?.stdId}
          onChange={handleChange}
          disabled
        />
      </div>

      <div className="electiveInputDiv">
        <Checkbox
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          style={{ color: '#1D8DE2' }}
          name="checkbox"
          value={checkbox}
          onChange={handleCheckboxChange}
        />
        <span className="checkboxtext">{'I accept the cancellation policy'}</span>
      </div>
      <div className="createelectivebtnDiv">
        <button className="createelectivebtn" onClick={handleSubmit}>
          Reserve
        </button>
      </div>
    </Box>
  );
  return (
    <div>
      <SwipeableDrawer
        anchor={'right'}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {
          setOpen(true);
        }}
      >
        {list('right')}
      </SwipeableDrawer>
    </div>
  );
};

export default AddReserveElective;
