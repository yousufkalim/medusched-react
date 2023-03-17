import React, { FC, useState, useEffect, useRef } from 'react';

import Noelectives from '../../assets/noElectives.svg';
import SortArrow1 from '../../assets/sortarrow1.svg';

import SortArrow2 from '../../assets/sortarrow2.svg';

import Addbtn from '../../assets/addbtn.svg';
import AddElectives from '../Modals/AddElectives';
// import AddElectivesD from '../Modals/AddElectiveD';
import { Store, UpdateStore } from '../../context/store';
import api from '../../api/request';
import Elective from '../../types/elective';
import ElectiveCard from './ElectiveCard';
// import DeleteElectives from '../Modals/DeleteElective';
// import EditElectives from '../Modals/EditElectives';

interface IElectives {
  electives: Elective[] | [];
}
const Electives: FC = () => {
  const store = Store();
  const updateStore = UpdateStore();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [selectedElective, setSelectedElective] = useState<Elective | null>(null);
  const [menuFlag, setMenuFlag] = useState<boolean>(false);
  // const [deleteopen, setDeleteOpen] = useState<boolean>(false);
  // const [editopen, setEditOpen] = useState<boolean>(false);

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
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMenuFlag(false);
      }
    };

    if (menuFlag) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [menuFlag]);
  useEffect((): void => {
    getElectives();
  }, [open]);
  const handleAddBtn = (): void => {
    setOpen(true);
  };
  const filterDeletedElectives = (electives: Elective[]): Elective[] => {
    return electives.filter((elective: Elective) => elective.active);
  };
  // const handleMenuIcon = (item: Elective): void => {
  //   setSelectedElective(item);
  //   setMenuFlag(!menuFlag);
  // };
  // const handleEdit = (): void => {
  //   // setEditOpen(true);
  //   console.log('handleedit');
  // };
  // const handleDelete = (): void => {
  //   // setDeleteOpen(true);
  //   console.log('handleedit');
  // };
  // console.log('selectedEl/ective', selectedElective, menuFlag);
  return (
    <>
      {loading ? (
        <>Loading</>
      ) : (
        <>
          {' '}
          {store?.electives && filterDeletedElectives(store?.electives).length > 0 ? (
            <div className={` ${menuFlag ? ' filterSection' : 'filterSection'}`}>
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
              <div className="electiveSection" ref={headerRef}>
                {filterDeletedElectives(store?.electives).map((item, i) => (
                  <>
                    <ElectiveCard getElectives={getElectives} item={item} />
                  </>
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
      {/* <AddElectivesD /> */}

      {/* <DeleteElectives open={deleteopen} setOpen={setDeleteOpen} handleDelete={handleDelete} />
      <EditElectives open={editopen} setOpen={setEditOpen} elective={selectedElective} /> */}
    </>
  );
};

export default Electives;
