import React from "react";
import { aa_api } from "../../utils/routes_config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./uploadaa.css";
import aahome from "../../assests/aahome.png";
import dqrfoot from "../../assests/dqrfoot.png";

export const UploadAA = () => {
  const domainHeader = ["Regression", "Classification"];
  const [file, setFile] = useState();
  const [target, setTarget] = useState();
  const [domain, setDomain] = useState();
  const [cols, setCols] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("data is reduced");
    const formData = new FormData();
    formData.append("domain", domain);
    formData.append("target", target);
    console.log(file, domain, target);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    setSpinner(true);

    aa_api.post("/upload_metrics", formData, config).then(({ data }) => {
      console.log(data);
      setSpinner(false);
      navigate("./report");
    });
  }

  function handleChange(event) {
    const formData = new FormData();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    formData.append("file", event.target.files[0]);
    console.log(event.target.files[0].name);

    aa_api.post("/upload_aa", formData, config).then((response) => {
      console.log(response.data);
      setCols(response.data.cols);
    });
    document.body
      .getElementsByClassName("file-upload-wrapper2")[0]
      .setAttribute("data-text", event.target.files[0].name);
    setFile(event.target.files[0]);
  }

  return (
    <div class="containerupload">
      {spinner ? (
        <h2 class="animate">Loading</h2>
      ) : (
        <>
        <div className="top">
        <img className="fimg" src={aahome} alt=""></img>
        <div>
          <p className="text">
            "ANALYZE" Different ML Algorithms for a Dataset
          </p>
          <p className="subtext">
            AA (Algorithm Analyzer) will find Best suited and Most Efficient
            Algorithm for a Given Dataset.
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
            <p className="dqrtext">Upload your dataset</p>
            <div className="file-upload-wrapper2" data-text="Select your file!">
              <input
                type="file"
                name="file"
                id="file"
                className="file-upload-field"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="metrics-sheet">
            <p className="dqrtextaa">Choose your Domain & Target</p>
            <div className="select">
              <select
                name={domain}
                id=""
                className="aa-form-domain"
                onChange={(e) => {
                  setDomain(e.target.value);
                }}
              >
                <option value="">Choose Domain</option>

                {domainHeader.map((item) => {
                  return (
                    <option className="sf-form-option" key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="select">
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
          <button className="custom-btn btn-10aa">Submit</button>
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
