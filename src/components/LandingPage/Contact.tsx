import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import Logo from '../../assets/logo.svg';
import { toast } from 'react-toastify';

const Contact: FC = () => {
  interface IUserObject {
    name: string;
    email: string;
    message: string;
  }
  const [formData, setFormData] = useState<IUserObject>({ name: '', email: '', message: '' });
  const [flagfocus, setFlagfocus] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (formData?.name === '') {
      toast.error('Name is Required');
    } else if (formData?.email === '') {
      toast.error('Email is Required');
    } else if (formData?.message === '') {
      toast.error('Message is Required');
    } else {
      console.log('formData', formData);
    }
  };
  console.log('flagfocus', flagfocus);

  return (
    <>
      <div className="contactcol">
        <div className="contactrow1">
          <h1 className="contactH1">
            Contact <span style={{ color: '#1d8de2' }}>Us</span>
          </h1>
          <p className="contactP1">
            The back and forth emails for scheduling inquiries, confirmations, and cancellations
            take an unnecessarily large amount of time!
          </p>
          <p className="contactP1">
            For students, it&apos;s time that could be better spent studying for STEP.
          </p>
          <p className="contactP1">
            For administrators, it&apos;s time that could be better spent keeping the hospital
            running smoothly.
          </p>
          <p className="contactP1">
            If you&apos;d like to get your medical school onboard with MedUSched, contact us today!
          </p>
          <div className="contactLogo">
            <img src={Logo} alt="logo" />
            <p className="logoP">
              {' '}
              Med<span style={{ color: '#1d8de2' }}>U</span>Sched
            </p>
          </div>
        </div>
        <div className="contactrow2">
          <div className="contactform">
            <div className="inputDiv">
              <p className={` ${flagfocus === 1 ? 'activeName' : 'contactinputName'}`}>Name</p>
              <input
                className="contactInput"
                type="text"
                placeholder="e.g John Doe"
                name="name"
                value={formData?.name}
                onChange={handleChange}
                onFocus={() => {
                  setFlagfocus(1);
                }}
                onBlur={() => {
                  setFlagfocus(0);
                }}
              />
            </div>
            <div className="inputDiv">
              <p className={` ${flagfocus === 2 ? 'activeName' : 'contactinputName'}`}>Email</p>
              <input
                className="contactInput"
                type="text"
                placeholder="e.g JohnDoe@gmail.com"
                name="email"
                value={formData?.email}
                onChange={handleChange}
                onFocus={() => {
                  setFlagfocus(2);
                }}
                onBlur={() => {
                  setFlagfocus(0);
                }}
              />
            </div>
            <div className="inputDiv">
              <p className={` ${flagfocus === 3 ? 'activeName' : 'contactinputName'}`}>Message</p>
              <textarea
                className="contactMessage"
                placeholder="Type Something"
                name="message"
                value={formData?.message}
                onChange={handleChange}
                onFocus={() => {
                  setFlagfocus(3);
                }}
                onBlur={() => {
                  setFlagfocus(0);
                }}
              />
            </div>
            <div className="contactbtnDiv">
              <button className="contactbtn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="contactLogoDown">
        <img src={Logo} alt="logo" />
        <p className="logoP">
          {' '}
          Med<span style={{ color: '#1d8de2' }}>U</span>Sched
        </p>
      </div>
      <div className="footerDiv">
        © 2023<span style={{ fontWeight: '900' }}> MedUSched</span> All Rights Reserved.
      </div>
    </>
  );
};

export default Contact;
