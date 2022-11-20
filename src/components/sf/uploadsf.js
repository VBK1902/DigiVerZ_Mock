import React, { useState } from "react";
import "./uploadsf.css";
import { cols } from "../../utils/sf_cols";
import { models } from "../../utils/sf_models";
import { sf_api } from "../../utils/routes_config";
import { useNavigate } from "react-router-dom";
import sfh from "../../assests/sf_home.png";
import dqrfoot from "../../assests/dqrfoot.png";
import TextField from "@mui/material/TextField";
import sfm from "../../assests/sfm.png";

export const UploadSF = () => {
  const [model, setModel] = useState("prophet");
  const [target, setTarget] = useState("price");
  const [months, setMonths] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const nav = useNavigate();
  const handleTenure = (event) => {
    setMonths(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
    const formData = new FormData();
    formData.append("model", model);
    formData.append("target", target);
    formData.append("months", months);

    console.log(model, target, months);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    sf_api.post("/upload", formData, config).then((response) => {
      console.log(response.data);
      setSpinner(false);
      nav("./report");
    });
  };
  return (
    <div className="sfcontainerdiv">
      {spinner ? (
        <h2 class="animate">Loading</h2>
      ) : (
        <>
        <div className="top">
        <div className="mbtext">
          <p className="text">
            Forecast Future Sales using Time Series Algorithm.
          </p>
          <p className="subtext">
            SF (Sales Forecasting) has a time series machine learning model to
            get desired future sales predictions.
          </p>
        </div>
        <img className="mbimgbig" src={sfh} alt=""></img>
      </div>

      <div className="tel sftop">
        <p className="teltext">HOUSING SALES FORECASTING</p>
        <div className="teldiv">
          <img src={sfm} className="salesimg" alt=""></img>
          <p className="salespara">
            Sales forecasts can be used to identify benchmarks and determine
            incremental impacts of new initiatives, plan resources in response
            to expected demand, and project future budgets.<br></br>
            <br></br>
            House Property Sales over time can be a major task to understand and
            comprehend. but the real task is determine how well a time series
            model can capture the trend from past dates to forecast the future
            curve with a single multinomial feature vector.
            <br></br>
            <br></br>
            It can help the realtor's and other entity to focus on the year or
            period in which more sales undertake and seamingly increase their
            commision cap.
            <br></br>
            <br></br>
            Sales Forecast Models are considered planning tools and are used by
            budgeting managers to collect sales drivers that generate forecasts.
            Some of the main functionality in this type of input form is that it
            uses drivers to automatically calculate the forecast (or budget) in
            the months seen across the columns.
            <br></br>
            <br></br>
            These driver inputs include: Available units, Property average area,
            Average price per square meter (or square foot), Monthly average
            speed (unit sales), and Beginning month (of sales).
          </p>
        </div>
      </div>

      <div className="dqrsection">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="dqrsection"
          method="post"
        >
          <div>
            <p className="dqrtext">Select your Model</p>
            <div className="select selectmodel">
              <select
                name={model}
                id=""
                className="aa-form-target"
                onChange={(e) => {
                  setModel(e.target.value);
                }}
              >
                <option value="" selected disabled>
                  Choose Time Series Model
                </option>
                {models.map((item) => {
                  return (
                    <option
                      className="sf-form-option"
                      key={item.value}
                      value={item.value}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="metrics-sheet">
            <p className="dqrtextaa">Choose your Target & Months</p>
            <div className="select">
              <select
                name={target}
                id=""
                className="aa-form-domain"
                onChange={(e) => {
                  setTarget(e.target.value);
                }}
              >
                <option value="">Choose Target </option>

                {cols.map((item) => {
                  return (
                    <option className="sf-form-option" key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <TextField
              className="selectboxm monthbox"
              id="outlined-basic"
              label="Months"
              variant="outlined"
              onChange={handleTenure}
            />
          </div>
          <button className="custom-btn btn-10aa sfb">Submit</button>
        </form>
      </div>
      <div className="dqrfootdiv">
        <img className="dqrfoot" src={dqrfoot} alt=""></img>
      </div>
        </>
      )}
      
    </div>
  );
};
