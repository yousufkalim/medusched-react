import React, { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { CSSObject } from '@emotion/react';

import DatePicker from 'react-datepicker';
import Box from '@mui/material/Box';
import { Checkbox } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import api from '../../api/request';
import { toast } from 'react-toastify';
import './AddElectives.css';
import { Store, UpdateStore } from '../../context/store';
import Elective from '../../types/elective';

const style: CSSObject = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  width: 600,
  borderRadius: '5px',
  fontFamily: 'outfit',

  '@media only screen and (max-width: 600px)': {
    width: '95%',
    maxWidth: '600px',
  },
};
const durationData = ['2 Week', '3 Week', '4 Week', '5 Week', '6 Week'];

interface IUserObject {
  title?: string;
  description?: string;
}
interface IElectivesBody extends IUserObject {
  start_date?: Date;
  duration?: string;
  limit?: boolean;
  elective?: Elective;
}

interface IBasicModal {
  open: boolean;
  setOpen: (open: boolean) => void;
  elective: Elective | null;
}

const EditElectives: FC<IBasicModal> = ({ open, setOpen, elective }) => {
  console.log('for edit elective 22', elective?.title);
  const navigate = useNavigate();

  const updateStore = UpdateStore();
  const store = Store();
  const [electiveData, setElectiveData] = useState<IUserObject>({
    title: '',
    description: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    elective?.start_date ? elective.start_date : null,
  );
  const [selectedDuration, setSelectedDuration] = useState<string>(
    elective?.duration ? elective.duration : 'Duration',
  );
  const [checkbox, setCheckbox] = useState<boolean>(elective?.limit ? elective?.limit : false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (elective) {
      setElectiveData({ title: elective?.title, description: elective?.description });
      setSelectedDate(elective?.start_date);
      setSelectedDuration(elective?.duration);
      setCheckbox(elective?.limit);
    }
  }, [elective, open]);
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
  const handleClose = (): void => {
    setOpen(false);
    setElectiveData({ title: '', description: '' });
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
    } else if (!checkbox) {
      toast.error('Please Accept Limit');
    } else {
      setLoading(true);
      void api<IElectivesBody>('put', `/electives/${elective?._id ?? ''}`, {
        title: electiveData?.title,
        description: electiveData.description,
        start_date: selectedDate,
        duration: selectedDuration,
        limit: checkbox,
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
          navigate('/electives');
          toast.success('Elective Updated Successfully');
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // style={{ backdropFilter: 'blur(1px)' }}
      >
        <Box sx={style}>
          <h1 className="addelectivesh1">Edit Elective</h1>
          <h2 className="addelectivesh2">Add your details about Elective</h2>
          <div className="electiveInputDiv">
            <p className="addelectivep">Title</p>
            <input
              className="addelectiveInput"
              type="text"
              placeholder="HIV Clinic"
              name="title"
              value={electiveData?.title ? electiveData?.title : ''}
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
            <span className="checkboxtext">{'Limit Enrolments'}</span>
          </div>
          <div className="createelectivebtnDiv">
            <button className="createelectivebtn" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default EditElectives;
