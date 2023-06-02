import React, { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Arrow from '../../assets/arrow2.svg';
import Slogo from '../../assets/slogo.svg';
import HidePassword from '../../assets/hidepass.svg';
import api from '../../api/request';
import { toast } from 'react-toastify';
import User from '../../types/user';
import School from '../../types/school';
import { mediaUrl } from '../../config';
import './StudentProfile.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: '30%',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface IBasicModal {
  open: boolean;
  setOpen: (open: boolean) => void;
  student?: User | null;
}

interface IStudentProfileObject {
  name: string;
  email?: string;
  logo?: string | null;
  school: string | School;
}
interface IUserSchool {
  schools: School[] | null;
  success: boolean;
}
interface IResetPassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const StudentProfile: FC<IBasicModal> = ({ open, setOpen, student }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [studentProfile, setStudentProfile] = useState<IStudentProfileObject>({
    name: '',
    email: '',
    logo: null,
    school: '',
  });
  const [resetPassword, setResetPassword] = useState<IResetPassword>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordFlag, setPasswordFlag] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState(
    student?.logo ? `${mediaUrl}/${String(student?.logo)}` : null,
  );
  const [schools, setSchools] = useState<School[] | null>([]);
  const [showoldPassword, setShowoldPassword] = useState<boolean>(false);
  const [shownewPassword, setShownewPassword] = useState<boolean>(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState<boolean>(false);

  useEffect(() => {
    setStudentProfile({
      name: student?.name ? student.name : '',
      email: student?.email ? student.email : '',
      logo: student?.logo ? student.logo : '',
      school: student?.school ? student.school : '',
    });
  }, [open]);
  useEffect(() => {
    getSchools();
  }, []);

  const getSchools = (): void => {
    api<IUserSchool>('get', `/schools/forusers`)
      .then((res) => {
        setSchools(res.schools);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ): void => {
    setStudentProfile({ ...studentProfile, [e.target.name]: e.target.value });
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setResetPassword({ ...resetPassword, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e: any): void => {
    const selectedImage = e.target.files[0];
    setStudentProfile({ ...studentProfile, logo: selectedImage });

    if (selectedImage) {
      setPreviewImage(URL.createObjectURL(selectedImage));
    }
  };
  const handleClose = (): void => {
    if (passwordFlag) {
      setPasswordFlag(false);
      setResetPassword({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      setOpen(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (studentProfile?.name === '') {
      toast.error('Name is Required');
    } else if (studentProfile?.school === '') {
      toast.error('School is Required');
    } else {
      const formData = new FormData();
      Object.entries(studentProfile).forEach(([key, value]) => {
        formData.append(key, value);
      });

      for (const [key, value] of formData.entries()) {
        console.log('1212edit', key, value);
      }
      setLoading(true);
      api('put', `/students/${student?._id ?? ''}`, formData)
        .then(async () => {
          toast.success('Student Updated successfully');
          setLoading(false);
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const handleResetPassword = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (resetPassword.oldPassword === '') {
      toast.error('Old Password is Required');
    } else if (resetPassword.newPassword === '') {
      toast.error('New Password is Required');
    } else if (resetPassword.newPassword !== resetPassword.confirmPassword) {
      toast.error('Password does not match');
    } else {
      api('put', `/students/resetPassword/${student?._id ?? ''}`, resetPassword)
        .then((res) => {
          toast.success('Password Updated successfully');
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <BootstrapDialog
        style={{ backdropFilter: 'blur(3px)' }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {/* <div className="crossIconDiv">
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
        </div> */}

        {!passwordFlag ? (
          <div className="stdmaindiv">
            <div className="studentprofileMaindiv">
              <div className="HPimgprofiile">
                <label className="upload-pic-label" htmlFor="filePicker">
                  <input
                    type="file"
                    hidden
                    id="filePicker"
                    name="file"
                    onChange={handleImageChange}
                  />
                  <div style={{ cursor: 'pointer' }} className="upload-img-text-cont">
                    <img src={previewImage ?? Slogo} className="studentprofilepic" />
                  </div>
                </label>
              </div>

              <div className="hospitalProfileloginInputDiv">
                <p className="Hprofileloginp">Name</p>
                <input
                  className="HProfileloginInput"
                  type="text"
                  placeholder="e.g John Doe"
                  name="name"
                  value={studentProfile?.name}
                  onChange={handleChange}
                />
              </div>
              <div className="hospitalProfileloginInputDiv">
                <p className="Hprofileloginp">Email</p>
                <input
                  className="HProfileloginInput"
                  type="text"
                  placeholder="Email"
                  name="email"
                  disabled
                  value={studentProfile?.email}
                  // onChange={handleChange}
                />
              </div>
              <div className="hospitalProfileloginInputDiv">
                <p className="Hprofileloginp">School</p>
                <select
                  className="studentprofileschool"
                  name="school"
                  defaultValue={studentProfile?.school as string}
                  value={studentProfile?.school as string}
                  onChange={handleChange}
                  disabled
                >
                  <option value="">Select School</option>
                  {schools?.map((school, index) => (
                    <option key={index} value={school?._id}>
                      {school?.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="changePasswordbtn"
                onClick={(): void => {
                  setPasswordFlag(true);
                }}
              >
                <p>Change Password</p>
                <img src={Arrow} alt="arrow" />
              </button>
              <div className="HprofilecreateelectivebtnDiv">
                <button
                  className="HProfilecreateelectivebtn"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Save Changes{' '}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="stdmaindiv">
            <div className="studentprofileMaindiv">
              <h1 className="changepasswordh1">Change Password</h1>
              <p className="changepasswordP1">
                Password must be between 8 and 32 characters, with one each of: a capital letter, a
                lowercase letter, a number, a special character
              </p>

              <div className="hospitalProfileloginInputDiv">
                <p className="Hprofileloginp">Old Password</p>
                <input
                  className="HProfileloginInput"
                  type={showoldPassword ? 'text' : 'password'}
                  placeholder="******"
                  name="oldPassword"
                  value={resetPassword?.oldPassword}
                  onChange={handleChangePassword}
                />
                <button
                  onClick={() => {
                    setShowoldPassword(!showoldPassword);
                  }}
                  className="studentpasswordicon"
                >
                  {' '}
                  <img src={HidePassword} alt="hidepass" />
                </button>
              </div>

              <div className="hospitalProfileloginInputDiv">
                <p className="Hprofileloginp">New Password</p>
                <input
                  className="HProfileloginInput"
                  type={shownewPassword ? 'text' : 'password'}
                  placeholder="******"
                  name="newPassword"
                  value={resetPassword?.newPassword}
                  onChange={handleChangePassword}
                />
                <button
                  onClick={() => {
                    setShownewPassword(!shownewPassword);
                  }}
                >
                  {' '}
                  <img className="studentpasswordicon" src={HidePassword} alt="hidepass" />
                </button>
              </div>
              <div className="hospitalProfileloginInputDiv">
                <p className="Hprofileloginp">Confimr Password</p>
                <input
                  className="HProfileloginInput"
                  type={showconfirmPassword ? 'text' : 'password'}
                  placeholder="******"
                  name="confirmPassword"
                  value={resetPassword?.confirmPassword}
                  onChange={handleChangePassword}
                />
                <button
                  onClick={() => {
                    setShowconfirmPassword(!showconfirmPassword);
                  }}
                >
                  {' '}
                  <img className="studentpasswordicon" src={HidePassword} alt="hidepass" />
                </button>
              </div>

              <div className="HprofilecreateelectivebtnDiv">
                <button className="HProfilecreateelectivebtn" onClick={handleResetPassword}>
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        )}
      </BootstrapDialog>
    </div>
  );
};
export default StudentProfile;
