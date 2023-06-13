import React, { FC, useState, useEffect, ChangeEvent } from 'react';

import Noelectives from '../../assets/noElectives.svg';
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
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

interface IElectives {
  electives: Elective[] | [];
}
interface IElectiveProps {
  title: string;
}
interface IMonths {
  name: string;
  checked: boolean;
}
const myHeader = ["Student's Name", 'Student’s ID', 'Start Date', 'End Date', 'Weeks'];

const monthArray = [
  { name: 'January', checked: false },
  { name: 'February', checked: false },
  { name: 'March', checked: false },
  { name: 'April', checked: false },
  { name: 'May', checked: false },
  { name: 'June', checked: false },
  { name: 'July', checked: false },
  { name: 'August', checked: false },
  { name: 'September', checked: false },
  { name: 'October', checked: false },
  { name: 'November', checked: false },
  { name: 'December', checked: false },
];
const Electives: FC<IElectiveProps> = ({ title }) => {
  const store = Store();
  const updateStore = UpdateStore();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [months, setMonths] = useState<IMonths[]>(monthArray);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [applyfilterarray, setApplyfilterarray] = useState<string[]>([]);
  const [searchByHospital, setsearchByHospital] = useState<string>('');
  // const [hospitalName, setHospitalName] = useState<string>('');

  const getElectives = (): void => {
    setLoading(true);
    api<IElectives>('get', `/electives/`)
      .then((res) => {
        const activeElectives = res.electives.filter((elective: Elective) => elective.active);
        if (updateStore) updateStore({ electives: activeElectives });
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
        // for student side filter electives that will be availble for apply within date
        const currentDate = new Date();
        const activeElectives = res.electives.filter((elective: Elective) => elective.active);
        const filteredElectiveswithDate = activeElectives.filter(
          (elective) =>
            new Date(elective.start_date) > currentDate ||
            elective.students.some((student) => student.studentId === store?.user?._id),
        );
        if (updateStore) updateStore({ electives: filteredElectiveswithDate });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect((): void => {
    store?.user?.role === 'student' ? getAllAffiliatedElectives() : getElectives();
  }, []);
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
  // const handlehospitalNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   console.log('target11', e.target.value);
  //   setHospitalName(e.target.value);
  // };
  // const handlehospitalNameChangeOuter = (e: any, v: any): void => {
  //   setHospitalName(v.label);
  // };

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
  // const filterDeletedElectives = (electives: Elective[]): Elective[] => {
  //   const filterElectives = electives.filter((elective: Elective) => elective.active);
  //   const seprateApplied =
  //     title === 'Applied Jobs'
  //       ? filterElectives.filter((elective) => elective.students.includes(store?.user?._id))
  //       : filterElectives.filter((elective) => !elective.students.includes(store?.user?._id));

  //   return seprateApplied;
  // };

  const handleApplyFilter = (electives: Elective[]): Elective[] => {
    // console.log('hospitalName,', hospitalName);
    // if (hospitalName) {
    //   return electives.filter((elective: Elective) => elective.title === hospitalName);
    // }

    if (applyfilterarray.length === 0 && !searchByHospital) {
      return electives;
    }

    let results = electives;

    if (searchByHospital) {
      const regex = new RegExp(searchByHospital, 'i'); // 'i' flag for case-insensitive matching
      console.log('regex', regex);
      const filteredValues = electives.filter((value) => regex.test(value.title));
      results = filteredValues;
    }

    if (applyfilterarray.length > 0) {
      const filterElectives = results.filter((elective: Elective) => {
        const electiveMonth = new Date(elective.start_date).toLocaleString('default', {
          month: 'long',
        });
        return applyfilterarray.includes(electiveMonth);
      });

      return filterElectives;
    }

    return results;
  };
  const filterDeletedElectives = (electives: Elective[]): Elective[] => {
    const filterwithroute =
      title === 'Applied Jobs'
        ? electives.filter((elective) =>
            elective.students.some(
              (student) => student.studentId?.toString() === (store?.user?._id ?? '').toString(),
            ),
          )
        : electives.filter(
            (elective) =>
              !elective.students.some(
                (student) => student.studentId?.toString() === (store?.user?._id ?? '').toString(),
              ),
          );
    return filterwithroute;
  };
  const handleClearAll = (): void => {
    // setHospitalName('');
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
      { name: 'August', checked: false },
      { name: 'September', checked: false },
      { name: 'October', checked: false },
      { name: 'November', checked: false },
      { name: 'December', checked: false },
    ]);
  };

  // const data = store?.electives
  //   ? title === 'Applied Jobs'
  //     ? filterDeletedElectives(store?.electives)
  //         ?.filter((elective) =>
  //           elective.students.some(
  //             (student) => student.studentId?.toString() === (store?.user?._id ?? '').toString(),
  //           ),
  //         )
  //         .map((item) => ({ label: item.hospital.name, ...item }))
  //     : filterDeletedElectives(store?.electives)
  //         ?.filter(
  //           (elective) =>
  //             !elective.students.some(
  //               (student) => student.studentId?.toString() === (store?.user?._id ?? '').toString(),
  //             ),
  //         )
  //         .map((item) => ({ label: item.hospital.name, ...item }))
  //   : [];

  console.log('serchbyhospital ', searchByHospital);

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
            <div className={`  'filterSection'}`}>
              <div className="electivlistDivMain">
                <div className="electivlistDiv">{title}</div>
                <div className="filter1dashboard">
                  {store?.user?.role === 'Hospital' && (
                    <ExportElectives
                      electives={filterDeletedElectives(store?.electives)}
                      myHeader={myHeader}
                    />
                  )}

                  <span style={{ color: 'gray', opacity: '0.6' }}>Filter by </span>
                  {/* <span className="n1"> Newest</span> */}
                  {/* <img className="SortArrow1D" src={SortArrow1} alt="SortArrow1" /> */}
                  {/* <div className="divline1"></div> */}
                  <button onClick={handleClick}>
                    <img className="SortArrow2D" src={SortArrow2} alt="SortArrow1" />
                  </button>
                  {store?.user?.role === 'student' && (
                    <div className="searchInputDiv">
                      <input
                        className="searchInput"
                        type="text"
                        placeholder="Search by hospital"
                        name="searchByHospital"
                        value={searchByHospital}
                        onChange={(e): void => {
                          setsearchByHospital(e.target.value);
                        }}
                      />
                    </div>
                  )}
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
                  {/* <div className="Menumaind2">Hospital Name</div> */}
                  {/* <Autocomplete
                    options={data}
                    freeSolo
                    disableClearable
                    onChange={handlehospitalNameChangeOuter}
                    className="searchHospital"
                    renderInput={(params) => (
                      <TextField
                        className="establish"
                        {...params}
                        placeholder="Enter Hospital name"
                        variant="outlined"
                        value={hospitalName}
                        name="hospitalName"
                      />
                    )}
                  /> */}
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
              <div className="electiveSection">
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
                    <div className="createElectivediv">No Elective to show</div>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}

      <AddElectives getElectives={getElectives} open={open} setOpen={setOpen} />
    </>
  );
};

export default Electives;
