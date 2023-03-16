import React, { FC, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Pic1 from '../../assets/P1.png';
import Noelectives from '../../assets/noElectives.svg';
import SortArrow1 from '../../assets/sortarrow1.svg';
import SortArrow2 from '../../assets/sortarrow2.svg';
import Addbtn from '../../assets/addbtn.svg';
import AddElectives from '../Modals/AddElectives';
import { Store, UpdateStore } from '../../context/store';
import api from '../../api/request';
import Elective from '../../types/elective';
import moment from 'moment';

interface IElectives {
  electives: Elective[] | [];
}
const Electives: FC = () => {
  const store = Store();
  const updateStore = UpdateStore();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getElectives = (): void => {
    setLoading(true);
    api<IElectives>('get', '/electives/')
      .then((res) => {
        if (updateStore) updateStore({ electives: res.electives });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect((): void => {
    getElectives();
  }, [open]);
  const handleAddBtn = (): void => {
    setOpen(true);
  };
  console.log('store in electives', store?.electives);
  const filterDeletedElectives = (electives: Elective[]): Elective[] => {
    return electives.filter((elective: Elective) => elective.active);
  };

  return (
    <>
      {loading ? (
        <>Loading</>
      ) : (
        <>
          {' '}
          {store?.electives && store?.electives.length > 0 ? (
            <div className="filterSection">
              <div className="electivlistDivMain">
                <div className="electivlistDiv">List of Electives</div>
                <div className="filter1dashboard">
                  <span style={{ color: 'gray', opacity: '0.6' }}>Sort by </span>
                  <span className="n1"> Newest</span>
                  <img className="SortArrow1D" src={SortArrow1} alt="SortArrow1" />
                  <div className="divline1"></div>
                  <img className="SortArrow2D" src={SortArrow2} alt="SortArrow1" />
                </div>
              </div>
              <div className="electiveSection">
                {filterDeletedElectives(store?.electives).map((item, i) => (
                  <div key={i} className="electiveCard">
                    <NavLink key={i} to={`/electives/${item._id}`}>
                      <div className="logoDiv">
                        <img src={Pic1} alt="Pic1" />
                        {/* {item?.applied && <button className="appliedBtn">Applied</button>} */}
                      </div>
                      <div className="headingDiv">
                        <h1 className="heading1">{item?.title}</h1>
                        <button className="Ebtn">30/30 reserved</button>
                      </div>
                      <div className="electivedesDiv">
                        <p className="cardP1">{item?.description}</p>
                      </div>
                      <div className="btnDiv">
                        <button className="dateBtn">
                          {moment(item?.start_date).format('DD-MM-YYYY')}
                        </button>
                        <button className="dateBtn">{item?.duration}</button>
                      </div>
                    </NavLink>
                  </div>
                ))}
              </div>
              <div className="addbtnDiv">
                <button className="addbtn" onClick={handleAddBtn}>
                  <img src={Addbtn} alt="Addbtn" className="addbtnimg" />
                </button>
              </div>
            </div>
          ) : (
            <div className="noElectivesMainDiv">
              <div>
                <img src={Noelectives} alt="Noelectives" />
              </div>
              <div className="addelectivediv2">
                <div className="createElectivediv"> Create New Electives</div>
                <button className="addnewElectivebtn" onClick={handleAddBtn}>
                  Add New Electives
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <AddElectives open={open} setOpen={setOpen} />
    </>
  );
};

export default Electives;
