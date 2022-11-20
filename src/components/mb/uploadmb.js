import React from "react";
import { useState } from "react";
import { models } from "../../utils/mb_models";
import { cols } from "../../utils/mb_cols";
import "./uploadmb.css";
import { mb_api } from "../../utils/routes_config";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import mbh from "../../assests/mb_home.png";
import mbc from "../../assests/mb_churn.png";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export const UploadMB = () => {
  const [model, setModel] = useState("lr");
  const [target, setTarget] = useState("Churn");
  const [gender, setGender] = useState("");
  const [senior, setSenior] = useState("");
  const [partner, setPartner] = useState("");
  const [depend, setDepend] = useState("");
  const [tenure, setTenure] = useState("");
  const [phones, setPhones] = useState("");
  const [multilines, setMultilines] = useState("");
  const [internets, setInternets] = useState("");
  const [onlinesecurity, setOnlinesecurity] = useState("");
  const [onlinebackup, setOnlinebackup] = useState("");
  const [deviceprot, setDeviceprot] = useState("");
  const [techsupp, setTechsupp] = useState("");
  const [streamtv, setStreamtv] = useState("");
  const [streammov, setStreammov] = useState("");
  const [contract, setContract] = useState("");
  const [paplessbill, setPaplessbill] = useState("");
  const [paymentmethod, setPaymentmethod] = useState("");
  const [monthlycharge, setMonthlycharge] = useState("");
  const [totalcharge, setTotalcharge] = useState("");
  const [modelpred, setModelpred] = useState("");
  const [churnresult, setChurnresult] = useState({});

  const nav = useNavigate();
  const mb_models = models;

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handleSenior = (event) => {
    setSenior(event.target.value);
  };

  const handlePartner = (event) => {
    setPartner(event.target.value);
  };

  const handleDepend = (event) => {
    setDepend(event.target.value);
  };

  const handleTenure = (event) => {
    setTenure(event.target.value);
  };

  const handlePhones = (event) => {
    setPhones(event.target.value);
  };

  const handleMultilines = (event) => {
    setMultilines(event.target.value);
  };

  const handleInternets = (event) => {
    setInternets(event.target.value);
  };

  const handleOnlinesecurity = (event) => {
    setOnlinesecurity(event.target.value);
  };

  const handleOnlinebackup = (event) => {
    setOnlinebackup(event.target.value);
  };

  const handleDeviceprot = (event) => {
    setDeviceprot(event.target.value);
  };

  const handleTechsupp = (event) => {
    setTechsupp(event.target.value);
  };

  const handleStreamtv = (event) => {
    setStreamtv(event.target.value);
  };

  const handleStreammov = (event) => {
    setStreammov(event.target.value);
  };

  const handleContract = (event) => {
    setContract(event.target.value);
  };

  const handlePaperlessbill = (event) => {
    setPaplessbill(event.target.value);
  };

  const handlePaymentmethod = (event) => {
    setPaymentmethod(event.target.value);
  };

  const handleMonthlycharge = (event) => {
    setMonthlycharge(event.target.value);
  };

  const handleTotalcharge = (event) => {
    setTotalcharge(event.target.value);
  };

  const handleModelpred = (event) => {
    setModelpred(event.target.value);
  };


  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("model", model);
    formData.append("target", target);
    console.log(formData.get("model"), formData.get("target"));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    mb_api.post("/upload", formData, config).then((response) => {
      console.log(response.data);
      nav("./report");
    });
  }

  function handleChurn(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("gender", gender);
    formData.append("SeniorCitizen", senior);
    formData.append("Partner", partner);
    formData.append("Dependents", depend);
    formData.append("tenure", tenure);
    formData.append("PhoneService", phones);
    formData.append("MultipleLines", multilines);
    formData.append("InternetService", internets);
    formData.append("OnlineSecurity", onlinesecurity);
    formData.append("OnlineBackup", onlinebackup);
    formData.append("DeviceProtection", deviceprot);
    formData.append("TechSupport", techsupp);
    formData.append("StreamingTV", streamtv);
    formData.append("StreamingMovies", streammov);
    formData.append("Contract", contract);
    formData.append("PaperlessBilling", paplessbill);
    formData.append("PaymentMethod", paymentmethod);
    formData.append("MonthlyCharges", monthlycharge);
    formData.append("TotalCharges", totalcharge);
    formData.append("modelp", modelpred);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    mb_api.post("/predict", formData, config).then((response) => {
      console.log(response.data);
      setChurnresult(response.data);
    });
  }

  return (
    <div>
      <div className="top">
        <div className="mbtext">
          <p className="text">
            Build Solutions for Real Time Business Problems
          </p>
          <p className="subtext">
            MB (Model Builder) has a machine learning model for one specific
            real time business problem.
          </p>
        </div>
        <img className="mbimgbig" src={mbh} alt=""></img>
      </div>
      <div className="tel">
        <p className="teltext">TELECOM CUSTOMER CHURN PREDICTION</p>
        <div className="teldiv">
          <img src={mbc} className="telimg" alt=""></img>
          <p className="telpara">
            Customer churn is defined as when customers or subscribers
            discontinue doing business with a firm or service. Customers in the
            telecom industry can choose from a variety of service providers and
            actively switch from one to the next. The telecommunications
            business has an annual churn rate of 15-25 percent in this highly
            competitive market.<br></br>
            <br></br>
            Customer churn is a critical metric because it is much less
            expensive to retain existing customers than it is to acquire new
            customers.
            <br></br>
            <br></br>
            <b>
              To reduce customer churn, telecom companies need to predict which
              customers are at high risk of churn.
            </b>
            <br></br>
            <br></br>
            To detect early signs of potential churn, one must first develop a
            holistic view of the customers and their interactions across
            numerous channels, including store/branch visits, product purchase
            histories, customer service calls, Web-based transactions, and
            social media interactions, to mention a few.
            <br></br>
            <br></br>
            As a result, by addressing churn, these businesses may not only
            preserve their market position, but also grow and thrive. More
            customers they have in their network, the lower the cost of
            initiation and the larger the profit. As a result, the company's key
            focus for success is reducing client attrition and implementing
            effective retention strategy.
          </p>
        </div>
      </div>
      <div className="churnresultsdiv">
        <p className="churnres">SEE PREDICTION RESULTS</p>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="churnsection"
          method="post"
        >
          <div>
            <div className="select sel1">
              <select
                id=""
                className="aa-form-domain"
                onChange={(e) => {
                  setModel(e.target.value);
                }}
              >
                <option value="">Choose Your Model Prototype</option>

                {mb_models.map((item) => {
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
            <div className="select sel2">
              <select
                name={target}
                id=""
                className="aa-form-target"
                onChange={(e) => {
                  setTarget(e.target.value);
                }}
              >
                <option value="" selected disabled>
                  Choose Target Column
                </option>
                {cols.map((item) => {
                  return (
                    <option className="sf-form-option" key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button className="custom-btnmb btn-10mb">Submit</button>
        </form>
      </div>
      <div>
        <p className="custchurn">PREDICT CHURN VALUE FOR A CUSTOMER</p>
        <form
          onSubmit={handleChurn}
          encType="multipart/form-data"
          method="post"
        >
          <div className="mainform">
            <div>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                className="selectbox"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={handleGender}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label">Partner</InputLabel>
              <Select
                className="selectbox partselect"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={partner}
                label="Partner"
                onChange={handlePartner}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>

              {/* <InputLabel id="demo-simple-select-label">Tenure</InputLabel> */}
              <TextField
                className="selectbox"
                id="outlined-basic"
                label="Tenure"
                variant="outlined"
                onChange={handleTenure}
              />

              <InputLabel id="demo-simple-select-label" className="tenure">
                MultipleLines
              </InputLabel>
              <Select
                className="selectbox"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={multilines}
                label="MultipleLines"
                onChange={handleMultilines}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
                <MenuItem value={"No phone service"}>No phone service</MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label">
                OnlineSecurity
              </InputLabel>
              <Select
                className="selectbox"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={onlinesecurity}
                label="OnlineSecurity"
                onChange={handleOnlinesecurity}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
                <MenuItem value={"No internet service"}>
                  No internet service
                </MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label">
                DeviceProtection
              </InputLabel>
              <Select
                className="selectbox"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={deviceprot}
                label="DeviceProtection"
                onChange={handleDeviceprot}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
                <MenuItem value={"No internet service"}>
                  No internet service
                </MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label">StreamingTV</InputLabel>
              <Select
                className="selectbox"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={streamtv}
                label="StreamingTV"
                onChange={handleStreamtv}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
                <MenuItem value={"No internet service"}>
                  No internet service
                </MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label">Contract</InputLabel>
              <Select
                className="selectbox"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={contract}
                label="Contract"
                onChange={handleContract}
              >
                <MenuItem value={"One year"}>One year</MenuItem>
                <MenuItem value={"Two year"}>Two year</MenuItem>
                <MenuItem value={"Month-to-month"}>Month-to-month</MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label">
                PaymentMethod
              </InputLabel>
              <Select
                className="selectbox partselect"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={paymentmethod}
                label="PaymentMethod"
                onChange={handlePaymentmethod}
              >
                <MenuItem value={"Electronic check"}>Electronic check</MenuItem>
                <MenuItem value={"Mailed check"}>Mailed check</MenuItem>
                <MenuItem value={"Bank transfer (automatic)"}>
                  Bank transfer (automatic)
                </MenuItem>
                <MenuItem value={"Credit card (automatic)"}>
                  Credit card (automatic)
                </MenuItem>
              </Select>

              {/* <InputLabel id="demo-simple-select-label">
                MonthlyCharges
              </InputLabel> */}
              <TextField
                className="selectbox"
                id="outlined-basic"
                label="MonthlyCharges"
                variant="outlined"
                onChange={handleMonthlycharge}
              />
            </div>
            <div className="seconddiv">
              <InputLabel id="demo-simple-select-label">
                SeniorCitizen
              </InputLabel>
              <Select
                className="selectbox"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={senior}
                label="SeniorCitizen"
                onChange={handleSenior}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label">Dependents</InputLabel>
              <Select
                className="selectbox"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={depend}
                label="Dependents"
                onChange={handleDepend}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label">
                PhoneService
              </InputLabel>
              <Select
                className="selectbox"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={phones}
                label="PhoneService"
                onChange={handlePhones}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label">
                InternetService
              </InputLabel>
              <Select
                className="selectbox"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={internets}
                label="InternetService"
                onChange={handleInternets}
              >
                <MenuItem value={"DSL"}>DSL</MenuItem>
                <MenuItem value={"Fiber optic"}>Fiber optic</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label">
                OnlineBackup
              </InputLabel>
              <Select
                className="selectbox"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={onlinebackup}
                label="OnlineBackup"
                onChange={handleOnlinebackup}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
                <MenuItem value={"No internet service"}>
                  No internet service
                </MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label">TechSupport</InputLabel>
              <Select
                className="selectbox"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={techsupp}
                label="TechSupport"
                onChange={handleTechsupp}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
                <MenuItem value={"No internet service"}>
                  No internet service
                </MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label">
                StreamingMovies
              </InputLabel>
              <Select
                className="selectbox"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={streammov}
                label="StreamingMovies"
                onChange={handleStreammov}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
                <MenuItem value={"No internet service"}>
                  No internet service
                </MenuItem>
              </Select>
              <InputLabel id="demo-simple-select-label">
                PaperlessBilling
              </InputLabel>
              <Select
                className="selectbox partselect"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={paplessbill}
                label="PaperlessBilling"
                onChange={handlePaperlessbill}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>

              {/* <InputLabel id="demo-simple-select-label">
                TotalCharges
              </InputLabel> */}
              <TextField
                className="selectbox"
                id="outlined-basic"
                label="TotalCharges"
                variant="outlined"
                onChange={handleTotalcharge}
              />

              <InputLabel id="demo-simple-select-label" className="tenure">
                Model
              </InputLabel>
              <Select
                className="selectbox"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={modelpred}
                label="Model"
                onChange={handleModelpred}
              >
                <MenuItem value={"ada"}>AdaBoost Classifier</MenuItem>
                <MenuItem value={"dt"}>DecisionTree Classifier</MenuItem>
                <MenuItem value={"gb"}>GradientBoosting Classifier</MenuItem>
                <MenuItem value={"lr"}>Logistic Regression</MenuItem>
                <MenuItem value={"rf"}>Random Forest</MenuItem>
              </Select>
            </div>
          </div>
          <button className="custom-btnmb btn-10mb churnbut">Submit</button>
        </form>
      </div>
      <div>
        {Object.keys(churnresult).length ? (
          <div className="finalchurnres">
            <p className="churnres firstp">
              Will Customer leave the Telecom company :{" "}
              <span className="custchurn">{churnresult.churn}</span>
            </p>
            <p className="churnres">
              Churn Probability : <span className="custchurn">{churnresult.prob}%</span>
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
      <Outlet></Outlet>
    </div>
  );
};
