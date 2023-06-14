import React, { FC } from 'react';
import { CSSObject } from '@emotion/react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import extendElectiveLogo from '../../assets/extendElective.svg';
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
  handleExtendElective: () => void;
  studentName: string;
  studentDuration: string;
  setStudentDuration: (duration: string) => void;
}
const ExtendElectiveModal: FC<IBasicModal> = ({
  open,
  setOpen,
  handleExtendElective,
  studentName,
  studentDuration,
  setStudentDuration,
}) => {
  const durationData = [
    '2 Weeks',
    '3 Weeks',
    '4 Weeks',
    '5 Weeks',
    '6 Weeks',
    '7 Weeks',
    '8 Weeks',
  ];
  const handleClose = (): void => {
    setOpen(false);
  };

  const handlePlusClick = (): void => {
    const currentIndex = durationData.indexOf(studentDuration);
    if (currentIndex < durationData.length - 1) {
      setStudentDuration(durationData[currentIndex + 1]);
    }
  };
  const handleMinusClick = (): void => {
    const currentIndex = durationData.indexOf(studentDuration);
    if (currentIndex > 0) {
      setStudentDuration(durationData[currentIndex - 1]);
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
          <div className="logodivExtend">
            <img src={extendElectiveLogo} alt="Deletelogo" />
          </div>
          <h1 className="deleteelectivesh1">Change Duration of</h1>
          <h2 className="Ename">{studentName}</h2>
          <h2 className="deleteelectivesh2">Adjust the duration of your validity with ease.</h2>
          <div className="durationMain1">
            <div className="duration1">Duration</div>
            <div className="Dline"></div>
            <div className="duration2">
              <button
                className="minusbtn"
                onClick={(): void => {
                  handleMinusClick();
                }}
              >
                -
              </button>
              <div className="weeksDiv">{studentDuration}</div>
              <button
                className="plusbtn"
                onClick={(): void => {
                  handlePlusClick();
                }}
              >
                +
              </button>
            </div>
          </div>

          <div className="deleteelectivebtnDiv">
            <button
              className="extendelectivebtn"
              onClick={() => {
                handleExtendElective();
              }}
            >
              Update
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default ExtendElectiveModal;
