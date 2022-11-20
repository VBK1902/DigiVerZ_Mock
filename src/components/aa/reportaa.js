import React from "react";
import { useState } from "react";
import { aa_api } from "../../utils/routes_config";
import "./reportaa.css";
import aarepfoot from "../../assests/reportfoot.png";

export const ReportAA = () => {
  const [dataFinal, setDataFinal] = useState({});
  const [spinner, setSpinner] = useState(false);
  const handleSubmit = () => {
    setSpinner(true);
    aa_api.get("/report").then(({ data }) => {
      console.log(data);
      setDataFinal(data);
      setSpinner(false);
    });
  };
  return (
    <div>
      {spinner ? (
        <h2 class="animate">Loading</h2>
      ) : (
        <>
        {Object.keys(dataFinal).length > 0 ? (
        <div className="aa-report-container">
          <p className="aa-report-title">FINAL REPORT</p>
          <p className="aa-report-model">
            <span style={{ fontWeight: "900", color: "#ff4646" }}>
              Best Model :{" "}
            </span>
            {dataFinal["best model"]}
          </p>

          <table className="fl-tableaa">
            <thead>
              <tr>
                {Object.keys(dataFinal.metrics[0]).map((item) => {
                  return <th>{item}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {dataFinal.metrics.map((item) => {
                return (
                  <tr>
                    {Object.keys(item).map((item2) => {
                      return <td>{item[item2]}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="aa-overall-button-container">
          <p className="aa-overall-button-container-title">
            All set to ANALYZE ML Model for your Dataset!
          </p>
          <button className="aa-overall-button" onClick={handleSubmit}>
            Start Analyzing
          </button>
          <div className="aafootcont">
            <img className="dqrfootaa" src={aarepfoot} alt=""></img>
          </div>
        </div>
      )}
        </>
      )}
      
    </div>
  );
};
