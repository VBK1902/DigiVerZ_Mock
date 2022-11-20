import React from "react";
import { useState } from "react";
import "./upload.css";
import data from "../../assests/dqr.png";
import { dqr_api } from "../../utils/routes_config";
import { useNavigate, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import dqrfoot from "../../assests/dqrfoot.png";

export const Upload = () => {
  const [spinner, setSpinner] = useState(false);
  const metrics = [
    { id: "0", name: "unique", title: "Uniqueness" },
    { id: "1", name: "complete", title: "Completeness" },
    { id: "2", name: "shape", title: "Dimension" },
    { id: "3", name: "cat_dist", title: "Categorical Distribution" },
    { id: "4", name: "num_dist", title: "Numerical Distribution" },
    { id: "5", name: "corr", title: "Correlation Heat Map" },
    { id: "6", name: "schema", title: "Schema" },
    { id: "7", name: "describe", title: "Summary Statistics" },
  ];
  const [toggle_sheet, setToggleSheet] = useState(false);
  const [file, setFile] = useState();
  const [sheet_name, setSheetName] = useState("");
  const [checked, setChecked] = useState({
    unique: false,
    complete: false,
    shape: false,
    cat_dist: false,
    num_dist: false,
    corr: false,
    schema: false,
    describe: false,
  });

  const navigate = useNavigate();

  function handleSubmit(event) {
    setSpinner(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("format", file.type);
    formData.append("sheet", sheet_name);
    formData.append("metrics", JSON.stringify(checked));

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    dqr_api.post("/upload", formData, config).then((response) => {
      console.log(response.data);
      setSpinner(false);
      navigate("report");
    });
  }

  function handleChange(event) {
    // console.log(event.target.files[0].name.split(".")[1]);
    // console.log(toggle_sheet);
    if (event.target.files[0].name.split(".")[1] !== "csv") {
      setToggleSheet(true);
    } else {
      setToggleSheet(false);
    }
    // console.log(toggle_sheet);
    // console.log(document.body.getElementsByClassName("file-upload-field")[0]);
    document.body
      .getElementsByClassName("file-upload-wrapper")[0]
      .setAttribute("data-text", event.target.files[0].name);
    setFile(event.target.files[0]);
  }

  // const box = document.getElementById('box');
  // box.removeAttribute('style');

  return (
    <div className="containerupload">
      {spinner ? (
        <h2 class="animate">Loading</h2>
      ) : (
        <>
          <div className="top">
            <img className="fimg" src={data} alt=""></img>
            <div>
              <p className="text">Want to know how QUALITY your DATA is!</p>
              <p className="subtext">
                DQR (Data Quality Reporter) will do the Various data exploratory
                analysis and produces a detailed report / infomation to the
                user.
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
                <div
                  className="file-upload-wrapper"
                  data-text="Select your file!"
                >
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="file-upload-field"
                    onChange={handleChange}
                  ></input>
                  {toggle_sheet ? (
                    <input
                      className="sheetname"
                      type="text"
                      placeholder="Enter Sheet Name"
                      onChange={(e) => {
                        setSheetName(e.target.value);
                      }}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="metrics-sheet">
                <p className="dqrtext2">Choose your metrics</p>
                <ul className="metrics  ks-cboxtags">
                  {metrics.map((item) => {
                    return (
                      <li
                        key={item.name}
                        className="metrics-item"
                        id="checklist"
                      >
                        <input
                          type="checkbox"
                          name={item.name}
                          id={item.id}
                          className="checkbox"
                          value={item.name}
                          checked={checked[item.name]}
                          onChange={(e) => {
                            setChecked((prev) => {
                              return {
                                ...prev,
                                [e.target.name]: !prev[e.target.name],
                              };
                            });
                          }}
                        />

                        <label className="checkbox-title" htmlFor={item.id}>
                          {item.title}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <button className="custom-btn btn-10">Submit</button>
              <Link to="./history">
                <button className="custom-btn btn-10h">History</button>
              </Link>
            </form>
          </div>
          <div className="dqrfootdiv">
            <img className="dqrfoot" src={dqrfoot} alt=""></img>
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
};
