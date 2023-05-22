import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../api/request';
import { toast } from 'react-toastify';
import './EvaluationModal.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: '30%',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface IBasicModal {
  open: boolean;
  setOpen: (open: boolean) => void;
  id?: string;
  electiveId?: string;
}

const EvaluationModal: FC<IBasicModal> = ({ open, setOpen, id, electiveId }) => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const handleClose = (): void => {
    setOpen(false);
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
      // setLoading(true);
      console.log('email', email);
      void api('post', `/auth/evaluationemail`, { email, id, electiveId })
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
      <BootstrapDialog
        style={{ backdropFilter: 'blur(3px)' }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div className="crossIconDiv">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className="evaluationDiv1">
          <h1 className="evaluationH1">Request Evaluation</h1>
          <p className="evaluationP1">Who do you want to send this to</p>
          <div className="evalutionelectiveInputDiv">
            <p className="evalutionaddelectivep">Enter Email</p>
            <input
              className="evalutionaddelectiveInput"
              type="text"
              placeholder="abc@xyz.com"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="evaluationcreateelectivebtnDiv">
            <button className="evaluationcreateelectivebtn" onClick={handleSubmit}>
              Send
            </button>
          </div>
        </div>
      </BootstrapDialog>
    </div>
  );
};
export default EvaluationModal;
