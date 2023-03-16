import React, { FC } from 'react';
import { CSSObject } from '@emotion/react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './AddElectives.css';

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

interface IBasicModal {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleDelete: () => void;
}
const DeleteElectiveModal: FC<IBasicModal> = ({ open, setOpen, handleDelete }) => {
  const handleClose = (): void => {
    setOpen(false);
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
          <h1 className="deleteelectivesh1">Delete Elective</h1>
          <h2 className="deleteelectivesh2">Are you sure you want to delete elective?</h2>

          <div className="deleteelectivebtnDiv">
            <button
              className="deletecencelbtn"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </button>
            <button
              className="deleteelectivebtn"
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default DeleteElectiveModal;
