import React, { FC, useState, useEffect } from 'react';
import Header from '../Header/Header';
import Pic1 from '../../assets/P1.png';
import Loc from '../../assets/loc.svg';
import Note from '../../assets/Note.svg';
import api from '../../api/request';
import Elective from '../../types/elective';
import { useNavigate, useParams } from 'react-router-dom';
import DeletIcon from '../../assets/delete.svg';
import EditIcon from '../../assets/edit.svg';
import DeleteElectives from '../Modals/DeleteElective';
import EditElectives from '../Modals/EditElectives';

import AddReserveElective from '../Modals/AddReserveElective';
import EvaluationModal from '../Modals/EvaluationModal';
import { Store } from '../../context/store';
import moment from 'moment';
import './SingleElective.css';

interface IElectiveResponse {
  elective: Elective;
  success: boolean;
}
const SingleElective: FC = () => {
  const store = Store();
  const params = useParams();
  const navigate = useNavigate();
  const id = params?.id ?? '';
  const [loading, setLoading] = useState<boolean>(false);
  const [elective, setElective] = useState<Elective | null>(null);
  const [deleteopen, setDeleteOpen] = useState<boolean>(false);
  const [editopen, setEditOpen] = useState<boolean>(false);
  const [openAddReserve, setOpenAddReserve] = useState<boolean>(false);
  const [openEvaluation, setOpenEvaluation] = useState<boolean>(false);

  const getSingleElectives = (): void => {
    setLoading(true);
    api<IElectiveResponse>('get', `/electives/${id}`)
      .then((res) => {
        setElective(res.elective);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect((): void => {
    getSingleElectives();
  }, [editopen]);
  console.log('loading ', loading, elective);

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
  console.log('store', store?.user);
  console.log(elective?.students);
  const studentApplied = elective?.students.find((student) => student?._id === store?.user?._id);
  console.log('headerName', studentApplied);

  const currentDate = new Date();

  return (
    <>
      <Header />
      <div className="singleElectiveContainer">
        <div className="singleElectiveHeading">
          <img src={Pic1} alt="Pic1" />
          <p className="electivetitle">{}</p>
        </div>
        <div className="singleElectiveBody">
          <div className="headingdiv1">
            <h1 className="heding1">{store?.user?.name}</h1>
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
            <div className="loc1">
              {' '}
              <img src={Loc} alt="Pic1" />
              <span style={{ color: '#1d8de2', margin: '0px 3px' }}>Patreon </span>
              <span style={{ color: 'gray' }}> London town, MD </span>
            </div>
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
            <span style={{ color: '#1d8de2', margin: '0px 2px' }}>
              {' '}
              Description <br className="singlebr"></br>-{' '}
            </span>
            {elective?.description}
          </p>
          <div className="singlebtnDiv">
            <button>
              <span style={{ color: 'gray', margin: '0px 5px' }}>Start Date</span>
              {moment(elective?.start_date).format('DD-MM-YYYY')}
            </button>
            <div className="btndiv2"></div>
            <button>
              <span style={{ color: 'gray', margin: '0px 5px' }}>Duration</span>
              {elective?.duration}
            </button>
          </div>
        </div>
        {currentDate > new Date(moment(elective?.start_date).format('DD-MM-YYYY')) && (
          <div className="noteDiv">
            <img src={Note} alt="Pic1" className="NoteImg" />
            <div className="noteMsg">
              If you need to cancel your elective, please contact your administrator.
            </div>
          </div>
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
                {elective?.students.map((student) => (
                  <>
                    <div className="applicantDiv">
                      <p className="applicantName1">{student?.name}</p>
                      <p className="applicantemail1">{student?.email}</p>
                    </div>
                  </>
                ))}
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
                  {currentDate < new Date(moment(elective?.start_date).format('DD-MM-YYYY')) && (
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
                    setOpenAddReserve(true);
                  }}
                >
                  Reserve
                </button>
              )}
            </div>
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
      <DeleteElectives open={deleteopen} setOpen={setDeleteOpen} handleDelete={handleDelete} />
      <EditElectives open={editopen} setOpen={setEditOpen} elective={elective} />
      <EvaluationModal open={openEvaluation} setOpen={setOpenEvaluation} />
    </>
  );
};

export default SingleElective;
