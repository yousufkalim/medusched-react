// import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import React, { FC, useState, ChangeEvent, FormEvent } from 'react';

import DatePicker from 'react-datepicker';
import { Checkbox } from '@material-ui/core';
import 'react-datepicker/dist/react-datepicker.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import api from '../../api/request';
import { toast } from 'react-toastify';
import './AddElectives.css';
import { Store, UpdateStore } from '../../context/store';
import Elective from '../../types/elective';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const durationData = ['2 Weeks', '3 Weeks', '4 Weeks', '5 Weeks', '6 Weeks', '7 Weeks', '8 Weeks'];

interface IUserObject {
  title?: string;
  description?: string;
  limit?: string;
}
interface IElectivesBody extends IUserObject {
  start_date?: Date;
  duration: string;
  limitenrollment: boolean;
  elective?: Elective;
}

interface IBasicModal {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const AddelectivesDrawer: FC<IBasicModal> = ({ open, setOpen }) => {
  const updateStore = UpdateStore();
  const store = Store();
  const [electiveData, setElectiveData] = useState<IUserObject>({
    title: '',
    description: '',
    limit: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>('Duration');
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  console.log('loading ', loading);

  //   Onchange funtions
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setElectiveData({ ...electiveData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null): void => {
    setSelectedDate(date);
  };
  const handleDurationChange = (event: ChangeEvent<{ value: unknown }>): void => {
    setSelectedDuration(event.target.value as string);
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCheckbox(event.target.checked);
  };

  //   End

  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (electiveData?.title === '') {
      toast.error('Title is Required');
    } else if (electiveData?.description === '') {
      toast.error('Description is Required');
    } else if (selectedDate === null) {
      toast.error('Date is Required');
    } else if (selectedDuration === 'Duration') {
      toast.error('Duration is Required');
    } else if (
      checkbox &&
      (!electiveData.limit ||
        Number(electiveData.limit) <= 0 ||
        !Number.isInteger(Number(electiveData.limit)))
    ) {
      toast.error('Please enter a positive integer limit');
    } else {
      setLoading(true);
      void api<IElectivesBody>('post', '/electives/', {
        title: electiveData?.title,
        description: electiveData.description,
        limit: checkbox ? electiveData.limit : '1000',
        start_date: selectedDate,
        duration: selectedDuration,
        limitenrollment: checkbox,
      })
        .then((res) => {
          if (updateStore && store && res.elective) {
            updateStore({
              electives: store.electives?.length
                ? [...store.electives, res.elective]
                : [res.elective],
            });
          }
          setOpen(false);
          setLoading(false);
          toast.success('Elective Created Successfully');
          setElectiveData({ title: '', description: '', limit: '' });
          setSelectedDate(null);
          setSelectedDuration('Duration');
          setCheckbox(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };
  const list = (anchor: Anchor): JSX.Element => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 600,
        '@media (max-width: 680px)': {
          width: 300,
        },
      }}
      role="presentation"
    >
      <h1 className="addelectivesh1">Add New Elective</h1>
      <h2 className="addelectivesh2">Add your details about Elective</h2>
      <div className="electiveInputDiv">
        <p className="addelectivep">Title</p>
        <input
          className="addelectiveInput"
          type="text"
          placeholder="HIV Clinic"
          name="title"
          value={electiveData?.title}
          onChange={handleChange}
        />
      </div>
      <div className="electiveInputDiv">
        <p className="addelectivep">Description</p>
        <input
          className="addelectiveInput"
          type="text"
          placeholder="Add Your Description"
          name="description"
          value={electiveData?.description}
          onChange={handleChange}
        />
      </div>
      <div className="electiveInputDiv">
        <p className="addelectivep">Start Date</p>
        <DatePicker
          selected={selectedDate && new Date(selectedDate)}
          onChange={handleDateChange}
          minDate={new Date()}
          // locale={selectedDateLang}
          // locale={locale}
          locale={'en-gb'}
          dateFormat="dd/MM/yyyy"
          className="addelectiveInput"
          //   value={date_of_birth}
          autoComplete="off"
          placeholderText="12-05-2023"
          dropdownMode="scroll"
          // dropdownMode="select"
          scrollableYearDropdown
          showYearDropdown
          yearDropdownItemNumber={18}
          // scrollableYearDropdown
          showMonthDropdown
          adjustDateOnChange
        />
      </div>
      <div className="electiveInputDiv">
        <p className="addelectivep"> Duration</p>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          defaultValue={selectedDuration}
          name="duration"
          value={selectedDuration}
          onChange={handleDurationChange}
          className="addelectiveInput"
          // onFocus={handleBlurSchools}
        >
          <MenuItem
            value="Duration"
            disabled
            // className={classes.menuitem}
          >
            <em>{'Duration'}</em>
          </MenuItem>
          {durationData.map((item, i) => {
            return (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <div className="electiveInputDiv">
        <Checkbox
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          style={{ color: '#1D8DE2' }}
          name="checkbox"
          value={checkbox}
          onChange={handleCheckboxChange}
        />
        <span className="checkboxtext">{'Limit Enrollments'}</span>
      </div>
      {checkbox && (
        <div className="electiveLimitInputDiv">
          <input
            className="addelectiveInput"
            type="text"
            placeholder="Add Your Limit of Electives"
            name="limit"
            value={electiveData?.limit ? electiveData?.limit : ''}
            onChange={handleChange}
          />
        </div>
      )}
      <div className="createelectivebtnDiv">
        <button className="createelectivebtn" onClick={handleSubmit}>
          Create
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

export default AddelectivesDrawer;
