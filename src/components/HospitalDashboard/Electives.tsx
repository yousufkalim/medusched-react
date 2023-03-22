import React, { FC, useState, useEffect, useRef } from 'react';

import Noelectives from '../../assets/noElectives.svg';
import SortArrow1 from '../../assets/sortarrow1.svg';
import Menu from '@mui/material/Menu';
import SortArrow2 from '../../assets/sortarrow2.svg';
import { Checkbox } from '@material-ui/core';
import Addbtn from '../../assets/addbtn.svg';
import AddElectives from '../Modals/AddElectives';
import { Store, UpdateStore } from '../../context/store';
import api from '../../api/request';
import Elective from '../../types/elective';
import ElectiveCard from './ElectiveCard';
import LinearProgress from '@mui/material/LinearProgress';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Augest',
  'September',
  'October',
  'November',
  'December',
];

interface IElectives {
  electives: Elective[] | [];
}
interface IElectiveProps {
  title: string;
}
const Electives: FC<IElectiveProps> = ({ title }) => {
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openFiltr = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  return (
    <>
      {loading ? (
        <div className="linerloading1">
          <LinearProgress />
        </div>
      ) : (
        <>
          {' '}
          {store?.electives && filterDeletedElectives(store?.electives).length > 0 ? (
            <div className={` ${menuFlag ? ' filterSection' : 'filterSection'}`}>
              <div className="electivlistDivMain">
                <div className="electivlistDiv">{title}</div>
                <div className="filter1dashboard">
                  <span style={{ color: 'gray', opacity: '0.6' }}>Sort by </span>
                  <span className="n1"> Newest</span>
                  <img className="SortArrow1D" src={SortArrow1} alt="SortArrow1" />
                  <div className="divline1"></div>
                  <button onClick={handleClick}>
                    <img className="SortArrow2D" src={SortArrow2} alt="SortArrow1" />
                  </button>
                </div>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openFiltr}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <div className="Menumaind1">
                    <div>Filter</div>
                    <button>Clear All</button>
                  </div>

                  <div className="Menumaind2">Month</div>
                  {months.map((m) => (
                    <>
                      <div className="Menumaind3">
                        <Checkbox
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                          name="checkbox"
                          style={{ color: 'gray' }}
                          // value={checkbox}
                          // onChange={handleCheckboxChange}
                        />
                        <span className="filtercheckboxtext">{m}</span>
                      </div>
                    </>
                  ))}
                  <div className="filterbtndiv">
                    <button className="filterClose">Close</button>
                    <button className="filterApply">Apply</button>
                  </div>
                </Menu>
              </div>
              <div className="electiveSection" ref={headerRef}>
                {filterDeletedElectives(store?.electives).map((item, i) => (
                  <>
                    <ElectiveCard getElectives={getElectives} item={item} />
                  </>
                ))}
              </div>
              {store?.user?.role === 'Hospital' ? (
                <>
                  {' '}
                  <div className="addbtnDiv">
                    <button className="addbtn" onClick={handleAddBtn}>
                      <img src={Addbtn} alt="Addbtn" className="addbtnimg" />
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div className="noElectivesMainDiv">
              {store?.user?.role === 'Hospital' ? (
                <>
                  {' '}
                  <div>
                    <img src={Noelectives} alt="Noelectives" />
                  </div>
                  <div className="addelectivediv2">
                    <div className="createElectivediv"> Create New Electives</div>
                    <button className="addnewElectivebtn" onClick={handleAddBtn}>
                      Add New Electives
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {' '}
                  <div>
                    <img src={Noelectives} alt="Noelectives" />
                  </div>
                  <div className="addelectivediv2">
                    <div className="createElectivediv"> Currently No Electives Available</div>
                  </div>
                </>
              )}
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
