import React, { FC, useState, useEffect, useRef, ChangeEvent } from 'react';

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
import ExportElectives from '../../utils/ExportElectives';

interface IElectives {
  electives: Elective[] | [];
}
interface IElectiveProps {
  title: string;
}
const myHeader = ['Title', 'Description', 'Duration'];

interface IMonths {
  name: string;
  checked: boolean;
}
const Electives: FC<IElectiveProps> = ({ title }) => {
  const store = Store();
  const updateStore = UpdateStore();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [menuFlag, setMenuFlag] = useState<boolean>(false);
  const [months, setMonths] = useState<IMonths[]>([
    { name: 'January', checked: false },
    { name: 'February', checked: false },
    { name: 'March', checked: false },
    { name: 'April', checked: false },
    { name: 'May', checked: false },
    { name: 'June', checked: false },
    { name: 'July', checked: false },
    { name: 'Augest', checked: false },
    { name: 'September', checked: false },
    { name: 'October', checked: false },
    { name: 'November', checked: false },
    { name: 'December', checked: false },
  ]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [applyfilterarray, setApplyfilterarray] = useState<string[]>([]);

  const getElectives = (): void => {
    setLoading(true);
    api<IElectives>('get', `/electives/`)
      .then((res) => {
        if (updateStore) updateStore({ electives: res.electives });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const getAllAffiliatedElectives = (): void => {
    setLoading(true);
    api<IElectives>('get', `/electives/all/affiliated`)
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
    store?.user?.role === 'student' ? getAllAffiliatedElectives() : getElectives();
  }, [open]);
  const handleAddBtn = (): void => {
    setOpen(true);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openFiltr = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleFilterCheckbox = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = e.target;
    setMonths(months.map((item) => (item.name === name ? { ...item, checked } : item)));

    if (checked) {
      setSelectedMonths((prevSelectedMonths) => [...prevSelectedMonths, name]);
    } else {
      setSelectedMonths((prevSelectedMonths) =>
        prevSelectedMonths.filter((month) => month !== name),
      );
    }
  };
  const filterDeletedElectives = (electives: Elective[]): Elective[] => {
    const filterElectives = electives.filter((elective: Elective) => elective.active);
    return filterElectives;
  };

  const handleApplyFilter = (electives: Elective[]): Elective[] => {
    if (applyfilterarray.length === 0) {
      return electives;
    }
    const filterElectives = electives.filter((elective: Elective) => {
      const electiveMonth = new Date(elective.createdAt).toLocaleString('default', {
        month: 'long',
      });
      return applyfilterarray.includes(electiveMonth);
    });
    return filterElectives;
  };
  const handleClearAll = (): void => {
    setApplyfilterarray([]);
    setSelectedMonths([]);
    setMonths([
      { name: 'January', checked: false },
      { name: 'February', checked: false },
      { name: 'March', checked: false },
      { name: 'April', checked: false },
      { name: 'May', checked: false },
      { name: 'June', checked: false },
      { name: 'July', checked: false },
      { name: 'Augest', checked: false },
      { name: 'September', checked: false },
      { name: 'October', checked: false },
      { name: 'November', checked: false },
      { name: 'December', checked: false },
    ]);
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
                  {store?.user?.role === 'Hospital' && (
                    <ExportElectives
                      electives={filterDeletedElectives(store?.electives)}
                      myHeader={myHeader}
                    />
                  )}

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
                    <button className="clearallFilterbtn" onClick={handleClearAll}>
                      Clear All
                    </button>
                  </div>

                  <div className="Menumaind2">Month</div>
                  {months.map(({ name, checked }) => (
                    <div className="Menumaind3" key={name}>
                      <Checkbox
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        name={name}
                        style={{ color: 'gray' }}
                        checked={checked}
                        onChange={(e) => {
                          handleFilterCheckbox(e);
                        }}
                      />
                      <span className="filtercheckboxtext">{name}</span>
                    </div>
                  ))}
                  <div className="filterbtndiv">
                    <button className="filterClose" onClick={handleClose}>
                      Close
                    </button>
                    <button
                      className="filterApply"
                      onClick={() => {
                        setApplyfilterarray(selectedMonths);
                        handleClose();
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </Menu>
              </div>
              <div className="electiveSection" ref={headerRef}>
                {handleApplyFilter(filterDeletedElectives(store?.electives))?.length > 0 ? (
                  handleApplyFilter(filterDeletedElectives(store?.electives)).map((item, i) => (
                    <ElectiveCard getElectives={getElectives} item={item} title={title} key={i} />
                  ))
                ) : (
                  <div className="noElectivefound">No Electives Found</div>
                )}
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
    </>
  );
};

export default Electives;
