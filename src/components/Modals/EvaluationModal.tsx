import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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
}

const EvaluationModal: FC<IBasicModal> = ({ open, setOpen }) => {
  const handleClose = (): void => {
    setOpen(false);
  };

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
              name="description"
              //   value={electiveData?.description}
              //   onChange={handleChange}
            />
          </div>
          <div className="evaluationcreateelectivebtnDiv">
            <button className="evaluationcreateelectivebtn">Send</button>
          </div>
        </div>
      </BootstrapDialog>
    </div>
  );
};
export default EvaluationModal;
