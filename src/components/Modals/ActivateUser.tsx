import React, { FC } from 'react';
import { CSSObject } from '@emotion/react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IStudent } from '../../types/user';
import './AddElectives.css';

const style: CSSObject = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  width: 450,
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
  setSelectedStudent: (selectedStudent: IStudent | null) => void;
  handleActivateStudent: () => void;
}
const ActivateUser: FC<IBasicModal> = ({
  open,
  setOpen,
  handleActivateStudent,
  setSelectedStudent,
}) => {
  const handleClose = (): void => {
    setOpen(false);
    setSelectedStudent(null);
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
          <h1 className="deleteelectivesh1"></h1>
          <h2 className="deleteelectivesh2">Do you want to activate this student?</h2>

          <div className="deleteelectivebtnDiv">
            <button
              className="activatebtn"
              onClick={() => {
                handleActivateStudent();
              }}
            >
              Activate
            </button>
            <button
              className="deletecencelbtn"
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default ActivateUser;
