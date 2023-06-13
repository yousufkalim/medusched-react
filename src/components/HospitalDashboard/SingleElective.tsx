import React, { FC, useState, useEffect } from 'react';
import Header from '../Header/Header';
// import Pic1 from '../../assets/P1.png';
import Loc from '../../assets/loc.svg';
import { mediaUrl } from '../../config';
import Note from '../../assets/Note.svg';
import api from '../../api/request';
import D1 from '../../assets/d1.svg';
import E1 from '../../assets/extendIcon.svg';
import Elective from '../../types/elective';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuI from '../../assets/Menu.svg';
import MenuItem from '@mui/material/MenuItem';
import DeletIcon from '../../assets/delete.svg';
import EditIcon from '../../assets/edit.svg';
import DeleteElectives from '../Modals/DeleteElective';
import EditElectives from '../Modals/EditElectives';
import LinearProgress from '@mui/material/LinearProgress';
import AddReserveElective from '../Modals/AddReserveElective';
import EvaluationModal from '../Modals/EvaluationModal';
import RemoveStudentElective from '../Modals/RemoveStudentElective';
import ExtendElective from '../Modals/ExtendElective';
import { Store } from '../../context/store';
import moment from 'moment';
import './SingleElective.css';
import { toast } from 'react-toastify';

interface IElectiveResponse {
  elective: Elective;
  success: boolean;
}

interface IElectiveID {
  electiveID?: string;
}
const SingleElective: FC = () => {
  const store = Store();
  const params = useParams();
  const navigate = useNavigate();
  const id = params?.id ?? '';
  const [loading, setLoading] = useState<boolean>(false);
  const [elective, setElective] = useState<Elective | null>(null);
  const [deleteopen, setDeleteOpen] = useState<boolean>(false);
  const [deleteopenstd, setDeleteopenstd] = useState<boolean>(false);
  const [extendopen, setExtendOpen] = useState<boolean>(false);
  const [editopen, setEditOpen] = useState<boolean>(false);
  const [openAddReserve, setOpenAddReserve] = useState<boolean>(false);
  const [openEvaluation, setOpenEvaluation] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [studentId, setStudentId] = React.useState<string>('');
  const [studentName, setStudentName] = React.useState<string>('');
  const [studentDuration, setStudentDuration] = React.useState<string>('');

  const open = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
    stdname: string,
    duration: string,
  ): void => {
    setAnchorEl(event.currentTarget);
    setStudentId(id);
    setStudentName(stdname);
    setStudentDuration(duration);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const getSingleElectives = (): void => {
    setLoading(true);
    api<IElectiveResponse>('get', `/electives/${id}`)
      .then((res) => {
        setElective({
          ...res.elective,
          students: res.elective.students?.map((item) => ({ ...item, flag: false })),
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect((): void => {
    getSingleElectives();
  }, []);

  const handleDelete = (): void => {
    api<IElectiveResponse>('put', `/electives/delete/${id}`)
      .then((res) => {
        setLoading(false);
        navigate('/electives');
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // const studentToggle = (id: string): void => {
  //   const findStudent = elective?.students.find((item) => item._id === id);
  //   if (findStudent && elective?.students) {
  //     setElective({
  //       ...elective,
  //       students: elective?.students?.map((student) =>
  //         id === student?._id ? { ...student, flag: !findStudent.flag } : student,
  //       ),
  //     });
  //   }
  // };
  const handleDeleteStudentElective = (): void => {
    setLoading(true);
    setDeleteopenstd(false);
    api<IElectiveID>('put', `/electives/deletestudent/${studentId}`, {
      electiveID: elective?._id,
    })
      .then((res) => {
        getSingleElectives();
        toast.success('Student remove successfully');
        setLoading(false);
        setStudentId('');
        setStudentName('');
        setStudentDuration('');
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const studentApplied = elective?.students.find(
    (student) => student?.studentId?._id === store?.user?._id,
  );
  const handleExtendElective = (): void => {
    api('put', `/electives/extendElective/${studentId}`, {
      electiveID: elective?._id,
      studentDuration,
    })
      .then((res) => {
        getSingleElectives();
        toast.success('Student Elective updated successfully');
        setExtendOpen(false);
        setStudentId('');
        setStudentName('');
        setStudentDuration('');
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const duration = elective?.students.some((student) => student.studentId._id === store?.user?._id)
    ? elective?.students.find((student) => student.studentId._id === store?.user?._id)?.duration ??
      ''
    : '';

  console.log('studnetddd', duration);

  const currentDate = new Date();

  return (
    <>
      <Header />
      {loading ? (
        <div className="linerloading1">
          <LinearProgress />
        </div>
      ) : (
        <>
          {' '}
          <div className="singleElectiveContainer">
            <div className="singleElectiveHeading">
              {/* <img src={Pic1} alt="Pic1" /> */}
              <div className="electivePics">
                <img
                  className="electivePics"
                  // src={`${mediaUrl}/${String(store?.user?.logo)}`}
                  src={`${mediaUrl}/${String(elective?.hospital?.logo)}`}
                  alt="pic1"
                />
              </div>
              <div>
                <p className="electivetitle">{elective?.hospital?.name}</p>
                <p className="electivetitleHmail">{elective?.hospital?.email}</p>
              </div>
            </div>

            <div className="singleElectiveBody">
              <div className="headingdiv1">
                {/* <h1 className="heding1">{store?.user?.name}</h1> */}
                <h1 className="heding1">{elective?.title}</h1>
                {store?.user?.role === 'Hospital' ? (
                  <div className="modifiedDiv">
                    <button
                      onClick={() => {
                        setEditOpen(true);
                      }}
                    >
                      <img src={EditIcon} alt="EditIcon" className="editiconimg" />
                    </button>

                    <button
                      onClick={() => {
                        setDeleteOpen(true);
                      }}
                    >
                      <img src={DeletIcon} alt="DeletIcon" className="editiconimg" />
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="singleloc">
                {elective?.hospital?.address && (
                  <div className="loc1">
                    {' '}
                    <img src={Loc} alt="Pic1" />
                    <span style={{ color: '#1d8de2', margin: '0px 3px' }}>
                      {elective?.hospital?.address}{' '}
                    </span>
                    {/* <span style={{ color: 'gray' }}> London town, MD </span> */}
                  </div>
                )}

                <div className="datediv">
                  <span style={{ color: 'gray' }}>
                    Posted {elective?.createdAt && moment(new Date(elective?.createdAt)).fromNow()}{' '}
                  </span>
                  {store?.user?.role === 'Hospital' && (
                    <>
                      {' '}
                      {elective?.students?.length && elective?.students?.length > 0 ? (
                        <span style={{ color: '#1d8de2', margin: '0px 3px' }}>
                          {elective?.students?.length} Applicant
                        </span>
                      ) : (
                        ''
                      )}
                    </>
                  )}
                </div>
              </div>
              <p className="singleP1">
                <span className="desSpan">
                  {' '}
                  Description <br className="singlebr"></br>-{' '}
                </span>
                {elective?.description}
              </p>
              <div className="singlebtnDiv">
                <button>
                  <span style={{ color: 'gray', margin: '0px 5px' }}>Start Date</span>
                  {moment(elective?.start_date).format('MM-DD-YYYY')}
                </button>
                <div className="btndiv2"></div>
                <button>
                  <span style={{ color: 'gray', margin: '0px 5px' }}>Duration</span>
                  {duration || elective?.duration}
                </button>
              </div>
            </div>
            {studentApplied ? (
              <>
                {' '}
                {elective && currentDate < new Date(elective?.start_date) && (
                  <div className="noteDiv">
                    <img src={Note} alt="Pic1" className="NoteImg" />
                    <div className="noteMsg">
                      If you need to cancel your elective, please contact your administrator.
                    </div>
                  </div>
                )}
              </>
            ) : (
              ''
            )}
          </div>
          {store?.user?.role === 'Hospital' ? (
            <div>
              <div className="applicant1">
                <div>Applicants</div>
                {elective?.limitenrollment && (
                  <div className="singleelectivelimit">{elective?.limit} Applicant Limit</div>
                )}
              </div>
              <div className="applicantMaindiv">
                {elective?.students?.length && elective?.students?.length > 0 ? (
                  <>
                    {elective?.students.map((student, i) => (
                      <>
                        <div className="applicantDiv">
                          {/* <div style={{ textAlign: 'end' }}>
                            <button
                              onClick={(): void => {
                                studentToggle(student._id);
                              }}
                            >
                              ...
                            </button>
                          </div> */}
                          <div className="appliedMainDiv">
                            <button
                              className="electiveMenuBtn"
                              onClick={(e): void => {
                                handleClick(
                                  e,
                                  student?.studentId?._id,
                                  student?.studentId?.name,
                                  student?.duration,
                                );
                              }}
                            >
                              <img src={MenuI} alt="MenuI" />
                            </button>
                          </div>
                          <div className="appliedDiv">
                            <p className="applicantName1">
                              {student?.studentId?.name}&nbsp;{student?.studentId?.lastName}
                            </p>
                            <p className="applicantemail1">{student?.studentId?.email}</p>
                            <p className="applicantemail1">
                              Duration: <button> {student?.duration}</button>
                            </p>
                          </div>
                        </div>
                      </>
                    ))}
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <div className="maind1">
                        <MenuItem
                          onClick={() => {
                            setDeleteopenstd(true);
                            handleClose();
                          }}
                        >
                          <img className="D1icon" src={D1} alt="Di" />
                          Delete
                        </MenuItem>
                      </div>
                      <div className="maind1">
                        <MenuItem
                          onClick={() => {
                            setExtendOpen(true);
                            handleClose();
                          }}
                        >
                          <img className="D1icon" src={E1} alt="Di" />
                          Change Duration
                        </MenuItem>
                      </div>
                    </Menu>
                  </>
                ) : (
                  <div className="NoApplied">
                    <h1>No Applicant</h1>
                  </div>
                )}
              </div>
            </div>
          ) : (
            ''
          )}
          {store?.user && (
            <>
              {store?.user?.role === 'Hospital' ? (
                ''
              ) : (
                <div className="singlereservebtnDiv">
                  {studentApplied ? (
                    <>
                      {elective && currentDate > new Date(elective?.start_date) && (
                        <button
                          className="singleReservebtn"
                          onClick={() => {
                            setOpenEvaluation(true);
                          }}
                        >
                          Request Evaluation
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      className="singleReservebtn"
                      onClick={() => {
                        if (
                          elective?.limitenrollment &&
                          elective?.students.length === elective?.limit
                        ) {
                          toast.error('Application limit reached');
                        } else {
                          setOpenAddReserve(true);
                        }
                      }}
                    >
                      Reserve
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}

      <AddReserveElective
        open={openAddReserve}
        setOpen={setOpenAddReserve}
        electiveId={id}
        user={store?.user ? store?.user : undefined}
        getSingleElectives={getSingleElectives}
      />
      <RemoveStudentElective
        open={deleteopenstd}
        setOpen={setDeleteopenstd}
        handleDelete={handleDeleteStudentElective}
      />
      <ExtendElective
        open={extendopen}
        setOpen={setExtendOpen}
        handleExtendElective={handleExtendElective}
        studentName={studentName}
        studentDuration={studentDuration}
        setStudentDuration={setStudentDuration}
      />

      <DeleteElectives open={deleteopen} setOpen={setDeleteOpen} handleDelete={handleDelete} />
      <EditElectives
        open={editopen}
        setOpen={setEditOpen}
        elective={elective}
        getSingleElectives={getSingleElectives}
      />
      <EvaluationModal
        open={openEvaluation}
        setOpen={setOpenEvaluation}
        id={store?.user?._id}
        electiveId={elective?._id}
      />
    </>
  );
};

export default SingleElective;
