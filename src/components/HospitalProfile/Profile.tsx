import React, { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Header from '../Header/Header';
import Arrow from '../../assets/arrow2.svg';
// import D1 from '../../assets/d1.jpeg';
// import Electives from '../HospitalDashboard/Electives';
import { Store } from '../../context/store';
import HidePassword from '../../assets/hidepass.svg';
import { mediaUrl } from '../../config';
import api from '../../api/request';
import { toast } from 'react-toastify';

import './Profile.css';

interface IHospitalProfileObject {
  name: string;
  email?: string;
  logo: string | null;
  address: string;
}
interface IResetPassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
const Profile: FC = () => {
  const store = Store();
  const [hospitalProfile, setHospitalProfile] = useState<IHospitalProfileObject>({
    name: '',
    email: '',
    logo: null,
    address: '',
  });
  const [resetPassword, setResetPassword] = useState<IResetPassword>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordFlag, setPasswordFlag] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState(
    store?.user?.logo ? `${mediaUrl}/${String(store?.user?.logo)}` : null,
  );
  const [showoldPassword, setShowoldPassword] = useState<boolean>(false);
  const [shownewPassword, setShownewPassword] = useState<boolean>(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState<boolean>(false);

  useEffect(() => {
    setHospitalProfile({
      name: store?.user?.name ? store?.user?.name : '',
      email: store?.user?.email ? store?.user?.email : '',
      logo: store?.user?.logo ? store?.user?.logo : '',
      address: store?.user?.address ? store?.user?.address : '',
    });
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setHospitalProfile({ ...hospitalProfile, [e.target.name]: e.target.value });
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setResetPassword({ ...resetPassword, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any): void => {
    const selectedImage = e.target.files[0];
    setHospitalProfile({ ...hospitalProfile, logo: selectedImage });

    if (selectedImage) {
      setPreviewImage(URL.createObjectURL(selectedImage));
    }
  };
  // const handleRemoveImg = (): void => {
  //   setPreviewImage(null);
  //   setHospitalProfile({ ...hospitalProfile, logo: null });
  // };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (hospitalProfile?.name === '') {
      toast.error('Name is Required');
    } else if (hospitalProfile?.address === '') {
      toast.error('Address is Required');
    } else if (hospitalProfile?.logo === null) {
      toast.error('Logo is Required');
    } else {
      const formData = new FormData();
      Object.entries(hospitalProfile).forEach(([key, value]) => {
        formData.append(key, value);
      });

      for (const [key, value] of formData.entries()) {
        console.log('1212edit', key, value);
      }
      setLoading(true);
      api('put', `/hospitals/${store?.user?._id ?? ''}`, formData)
        .then(async () => {
          toast.success('hospital Updated successfully');
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
      api('put', `/hospitals/resetPassword/${store?.user?._id ?? ''}`, resetPassword)
        .then((res) => {
          toast.success('Password Updated successfully');
          setResetPassword({ oldPassword: '', newPassword: '', confirmPassword: '' });
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };
  return (
    <>
      <Header />
      {!passwordFlag ? (
        <div className="profileMaindiv">
          <div className="HPimgprofiile">
            <label className="upload-pic-label" htmlFor="filePicker">
              <input type="file" hidden id="filePicker" name="file" onChange={handleImageChange} />
              <div style={{ cursor: 'pointer' }} className="upload-img-text-cont">
                <img src={previewImage ?? ''} className="hospitalprofilepic" />
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
              value={hospitalProfile?.name}
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
              value={hospitalProfile?.email}
              // onChange={handleChange}
            />
          </div>
          <div className="hospitalProfileloginInputDiv">
            <p className="Hprofileloginp">Address</p>
            <input
              className="HProfileloginInput"
              type="text"
              placeholder="Email"
              name="address"
              value={hospitalProfile?.address}
              onChange={handleChange}
            />
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
            <button className="HProfilecreateelectivebtn" onClick={handleSubmit} disabled={loading}>
              Save Changes{' '}
            </button>
          </div>
        </div>
      ) : (
        <div className="profileMaindiv">
          <div>
            <h1 className="changepasswordh1">Change Password</h1>
            <p className="changepasswordP1">
              Password must be between 8 and 32 characters, with one each of: a capital letter, a
              lowercase letter, a number, a special character
            </p>
          </div>

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
              className="hospitalpasswordicon"
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
              <img className="hospitalpasswordicon" src={HidePassword} alt="hidepass" />
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
              <img className="hospitalpasswordicon" src={HidePassword} alt="hidepass" />
            </button>
          </div>

          <div className="HprofilecreateelectivebtnDiv">
            <button className="HProfilecreateelectivebtn" onClick={handleResetPassword}>
              Reset Password
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
