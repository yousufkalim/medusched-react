import React, { FC } from 'react';
import Brand01 from '../../assets/Brand01.svg';
import Brand1 from '../../assets/Brand1.svg';
import Brand2 from '../../assets/Brand2.svg';
import Brand3 from '../../assets/Brand3.svg';
import Brand4 from '../../assets/Brand4.svg';

const Partners: FC = () => {
  return (
    <>
      <div className="partnerMaindiv">
        <div className="brand1">
          <img className="brandimg" src={Brand01} alt="Brand1" />
        </div>
        <div className="brand1">
          <img className="brandimg" src={Brand1} alt="Brand1" />
        </div>
        <div className="brand1">
          <img className="brandimg" src={Brand2} alt="Brand1" />
        </div>
        <div className="brand1">
          <img className="brandimg" src={Brand3} alt="Brand1" />
        </div>
        <div className="brand1">
          <img className="brandimg" src={Brand4} alt="Brand1" />
        </div>
      </div>
    </>
  );
};

export default Partners;
