import React from "react";
import "./reportmb.css";
import { useState } from "react";
import { mb_api } from "../../utils/routes_config";
import { DataGrid } from "@mui/x-data-grid";
import { round } from "lodash";
import aarepfoot from "../../assests/reportfoot.png";

export const ReportMB = () => {
  const [history, setHistory] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const cols = [
    {
      field: "id",
      headerName: "Id",
      minWidth: 180,
      headerClassName: "super-app-theme--header",
      headerAlign: "start",
    },
    {
      field: "model_name",
      headerName: "Model Name",
      minWidth: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "start",
    },
    {
      field: "cross_validation",
      headerName: "Cross Validated Result",
      minWidth: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "start",
    },
    {
      field: "training_acc",
      headerName: "Training Accuracy",
      minWidth: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "start",
    },
    {
      field: "testing_acc",
      headerName: "Testing Accuracy",
      minWidth: 150,
      headerClassName: "super-app-theme--header",
      headerAlign: "start",
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 180,
      headerClassName: "super-app-theme--header",
      headerAlign: "start",
    },
    {
      field: "Status",
      headerName: "Status",
      minWidth: 123,
      headerClassName: "super-app-theme--header",
      headerAlign: "start",
    },
  ];
  const [currentModel, setCurrentModel] = useState({});

  const rounder = (val) => {
    return (round(val, 1) * 100).toString() + "%";
  };

  const composeDate = (date) => {
    return (
      new Date(date).toLocaleDateString() +
      " " +
      new Date(date).toLocaleTimeString()
    );
  };

  const loadHistory = () => {
    setSpinner(true);
    mb_api.get("/train").then((response) => {
      let temp = response.data.results.history.map((item) => {
        return {
          id: item["_id"],
          Status: item["Status"],
          cross_validation: rounder(item["cross_validation"]),
          model_name: item["model_name"],
          training_acc: rounder(item["training_result"]["Accuracy Score"]),
          testing_acc: rounder(item["testing_result"]["Accuracy Score"]),
          date: composeDate(item["date"]),
        };
      });
      setHistory(temp);
      setCurrentModel(response.data.results.performance);
      setSpinner(false)
      console.log(currentModel, response.data.results);
    });
  };

  const handleView = (data) => {
    console.log(data);
    mb_api.get("/view/" + data.id).then((response) => {
      console.log(response.data);
      setCurrentModel(response.data);
    });
  };
  return (
    <div>
      {spinner ? (
        <h2 class="animate">Loading</h2>
      ) : (
        <>
        {Object.keys(currentModel).length ? (
        <div>
          <p className="history-page-title report-title mbhis">
            PREVIOUS PREDICTIONS
          </p>
          <div className="table">
            <DataGrid
              sx={{
                backgroundColor: "white",
                border: "5px solid black",
                color: "black",
              }}
              rows={history}
              columns={cols}
              pageSize={8}
              autoHeight={true}
              onRowClick={(data) => {
                handleView(data);
              }}
            />
          </div>
          <div className="mb_report_container_current">
            <h3 className="mb_report_history_title mb_report_current_title">
              CURRENT SCOPE
            </h3>
            <div className="mb_report_current_main">
              <div className="mb_report_current_model">
                <h4 className="mb_report_current_subtitle">Model Name</h4>
                <p className="mb_report_current_value">
                  {currentModel.model_name}
                </p>
              </div>

              <div className="mb_report_current_model_status">
                <h4 className="mb_report_current_subtitle">Status</h4>
                <p className="mb_report_current_value" id="status">
                  {currentModel.Status}
                </p>
              </div>
            </div>
            {currentModel["model_params"] == null ? (
              ""
            ) : (
              <div className="mb_report_current_model_params_container">
                <h4 className="mb_report_current_model_params_container-title">
                  Model Baseline Parameter's
                </h4>
                <table className="fl-table">
                  <thead>
                    <tr>
                      {Object.keys(currentModel.model_params).map((item) => {
                        return <th key={item}>{item}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.keys(currentModel.model_params).map((item) => {
                        return (
                          <td key={item}>
                            {currentModel.model_params[item]
                              ? currentModel.model_params[item]
                              : "null"}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mb_report_prediction_results_current">
            <h3 className="mb_report_history_title mb_report_current_title per">
              PERFORMANCE EVALUATION
            </h3>
            {currentModel["training_result"] == null ? (
              ""
            ) : (
              <div className="mb_report_performance_container">
                <div className="mb_report_performance_accuracy">
                  <div>
                    <h3>Training Accuracy</h3>
                    <p>
                      {rounder(currentModel.training_result["Accuracy Score"])}
                    </p>
                  </div>
                  <div>
                    <h3>Testing Accuracy</h3>
                    <p>
                      {rounder(currentModel.testing_result["Accuracy Score"])}
                    </p>
                  </div>
                </div>
                <div className="mb_report_performance_baccuracy">
                  <div>
                    <h3>Training Balanced Accuracy</h3>
                    <p>
                      {rounder(
                        currentModel.training_result["Balanced Accuracy Score"]
                      )}
                    </p>
                  </div>
                  <div>
                    <h3>Testing Balanced Accuracy</h3>
                    <p>
                      {rounder(
                        currentModel.testing_result["Balanced Accuracy Score"]
                      )}
                    </p>
                  </div>
                </div>

                <div className="mb_report_performance_jaccard">
                  <div>
                    <h3>Training Jaccard Score</h3>
                    <p>
                      {rounder(
                        currentModel.training_result["Jaccard Similarity Score"]
                      )}
                    </p>
                  </div>
                  <div>
                    <h3>Testing Jaccard Score</h3>
                    <p>
                      {rounder(
                        currentModel.testing_result["Jaccard Similarity Score"]
                      )}
                    </p>
                  </div>
                </div>

                <div className="mb_report_performance_roc">
                  <div>
                    <h3>Training Roc Score</h3>
                    <p>{rounder(currentModel.training_result["Roc Score"])}</p>
                  </div>
                  <div>
                    <h3>Testing Roc Score</h3>
                    <p>{rounder(currentModel.testing_result["Roc Score"])}</p>
                  </div>
                </div>

                {/* <div className='curves'></div> */}
                <div className="mb_report_performance_roc_curve">
                  <div>
                    <h3>Training Roc Curve</h3>
                    <img
                      className="img-roc"
                      src={currentModel.training_result["Roc Curve"]}
                      alt=""
                    ></img>
                  </div>
                </div>

                <div className="mb_report_performance_roc_curve">
                  <div>
                    <h3>Testing Roc Curve</h3>
                    <img
                      className="img-roc"
                      src={currentModel.testing_result["Roc Curve"]}
                      alt=""
                    />
                  </div>
                </div>

                <div className="mb_report_performance_conf">
                  <div>
                    <h3>Training Confusion Matrix</h3>
                    <img
                      className="img-conf"
                      src={currentModel.training_result["Confusion Matrix"]}
                      alt=""
                    ></img>
                  </div>
                </div>

                <div className="mb_report_performance_conf">
                  <div>
                    <h3>Testing Confusion Matrix</h3>
                    <img
                      className="img-conf"
                      src={currentModel.testing_result["Confusion Matrix"]}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="aa-overall-button-container">
          <p className="aa-overall-button-container-title">
            Predictions are done on dataset with selected Model!
          </p>
          <button className="aa-overall-button" onClick={loadHistory}>
            Show Predictions
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
                                                                              