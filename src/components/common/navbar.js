import React from "react";
import "./navbar.css";

export const Navbar = () => {
  return (
      <nav>
        <a className="home" href="/">HOME</a>
        <a className="dqr" href="dqr">DATAQUALITY REPORT</a>
        <a className="mb" href="mb">MODEL BUILDER</a>
        <a className="sf" href="sf">SALES FORECASTING</a>
        <a className="aa" href="aa">ALGORITHM ANALYZER</a>
        <div id="indicator"></div>
      </nav>
  );
};
