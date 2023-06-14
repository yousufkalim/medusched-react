import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { CSSObject } from '@emotion/react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import api from '../../api/request';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

import './ForgotPassword.css';

const style: CSSObject = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  width: 500,
  borderRadius: '20px',
  fontFamily: 'outfit',

  '@media only screen and (max-width: 600px)': {
    width: '95%',
    maxWidth: '600px',
  },
};

interface IBasicModal {
  open: boolean;
  setOpen: (open: boolean) => void;
  role: string;
}
const ForgotPassword: FC<IBasicModal> = ({ open, setOpen, role }) => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = (): void => {
    setOpen(false);
    setEmail('');
  };
  //   Onchange funtions
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      // Email address is invalid
      toast.error('Invalid email address');
    } else {
      setLoading(true);
      void api('put', `/auth/forgot/${email}`, { role })
        .then((res) => {
          setOpen(false);
          setLoading(false);
          setEmail('');
          toast.success('Email sent successfully');
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };
  console.log(loading);
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
          <h1 className="forgotpasswordTitle">Forgot Password</h1>
          <h2 className="forgotpasswordDesc">
            We will send a reset password link to your email address.
          </h2>

          <div className="forGotInputDiv">
            <p className="loginp">Email</p>
            <input
              className="forGotInput"
              type="text"
              placeholder="e.g JohnDoe@gmail.com"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="forgotbtn" onClick={handleSubmit} disabled={loading}>
              {loading ? <CircularProgress color="inherit" /> : 'Send Reset Instructions'}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default ForgotPassword;
