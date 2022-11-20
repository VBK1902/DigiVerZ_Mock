import React, { useState } from "react";
import "./reportsf.css";
import { sf_api } from "../../utils/routes_config";
import { DataGrid } from "@mui/x-data-grid";
import aarepfoot from "../../assests/reportfoot.png";
import dqrreport from "../../assests/report.png";

export const ReportSF = () => {
  const [spinner, setSpinner] = useState(false);
  const [dataReport, setDataReport] = useState({});

  const colheader = [
    {
      field: "id",
      headerName: "Id",
      minWidth: 280,
      headerClassName: "super-app-theme--header",
      headerAlign: "start",
    },
    {
      field: "model_name",
      headerName: "Engine Name",
      minWidth: 480,
      headerClassName: "super-app-theme--header",
      headerAlign: "start",
    },
    {
      field: "period",
      headerName: "Forecast Period",
      minWidth: 180,
      headerClassName: "super-app-theme--header",
      headerAlign: "start",
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 271.5,
      headerClassName: "super-app-theme--header",
      headerAlign: "start",
    },
  ];

  const handleRequest = () => {
    setSpinner(true);
    sf_api.get("/report").then(({ data }) => {
      console.log(data);
      let temp = data.history.map((item) => {
        return {
          id: item["_id"],
          model_name: item["running_results"]["model_name"],
          period: Object.keys(item["running_results"]["forecasted_sales"])
            .length,
          date: item["date"],
        };
      });
      let new_data = {
        eda: data.eda,
        history: temp,
        running_results: data.running_results,
      };

      console.log(new_data);
      setDataReport(new_data);
      setSpinner(false);
    });
  };
  const handleView = (data) => {
    console.log(data);
    sf_api.get("/view/" + data.id).then((response) => {
      console.log(response.data);
      setDataReport((prev) => {
        return {
          eda: prev.eda,
          history: prev.history,
          running_results: response.data.running_results,
        };
      });
    });
  };

  return (
    <div>
      {spinner ? (
        <h2 class="animate">Loading</h2>
      ) : (
        <>
        {Object.keys(dataReport).length > 0 ? (
        <div className="sf-report-container">
          <p className="history-page-title report-title mbhis">
            PREVIOUS PREDICTIONS
          </p>
          <div className="table tablesize">
            <DataGrid
              sx={{
                backgroundColor: "white",
                border: "5px solid black",
                color: "black",
              }}
              rows={dataReport.history}
              columns={colheader}
              autoHeight={true}
              pageSize={5}
              onRowClick={(data) => {
                handleView(data);
              }}
            />
          </div>
          {<p className="reporthead edasf">EXPLORATORY DATA ANALYSIS</p>}
          <div className="sf-report-eda">
            <div className="dim1 cyan">
              <h2>Dimension</h2>
              <p className="ptext edaptext">
                {(dataReport.eda["shape"] !== null) &
                (dataReport.eda["shape"] !== undefined) ? (
                  <span>
                    <span>{dataReport.eda["shape"][0]}, </span>
                    <span> {dataReport.eda["shape"][1]}</span>
                  </span>
                ) : (
                  <p className="ptextnot">Not Selected</p>
                )}
              </p>
              <img
                className="dqrimg1"
                src="https://cdn-icons-png.flaticon.com/512/4560/4560926.png"
                alt=""
              />
            </div>
            <div className="com1 red">
              <h2>Completeness</h2>
              <p>
                {(dataReport.eda["completeness"] !== null) &
                (dataReport.eda["completeness"] !== undefined) ? (
                  <p className="ptext edaptext">{dataReport.eda["completeness"]}</p>
                ) : (
                  <p className="ptextnot">Not Selected</p>
                )}
              </p>
              <img
                className="mbimg1"
                src="https://cdn-icons-png.flaticon.com/512/3368/3368863.png"
                alt=""
              />
            </div>
            <div className="uniq1 blue">
              <h2>Uniqueness</h2>
              <p>
                {(dataReport.eda["uniqueness"] !== null) &
                (dataReport.eda["uniqueness"] !== undefined) ? (
                  <p className="ptext edaptext">{dataReport.eda["uniqueness"]}</p>
                ) : (
                  <p className="ptextnot">Not Selected</p>
                )}
              </p>
              <img
                className="sfimg1"
                src="https://cdn-icons-png.flaticon.com/512/5992/5992420.png"
                alt=""
              />
            </div>
            <img className="dqrreportimg1" src={dqrreport} alt=""></img>
            <p className="schematitle">SCHEMA</p>
            <div className="schemaeda">
              {(dataReport.eda["schema"] !== null) &
              (dataReport.eda["schema"] !== undefined)
                ? dataReport.eda["schema"].map((item, index) => {
                    return (
                      <div className="box1 cyan">
                        <h2 className="schemahead">{item[0]}</h2>
                        <p className="schematext">{item[1]}</p>
                      </div>
                    );
                  })
                : ""}
            </div>

            <div className="describe">
              <p className="summarytitle">Summary Statistics</p>
              <div className="dqr_report_table_container">
                {(dataReport.eda["describe"] !== null) &
                (dataReport.eda["describe"] !== undefined)
                  ? Object.keys(dataReport.eda["describe"]).map((item) => {
                      return (
                        <div className="table-wrapper">
                          <h2 className="tableheading">{item}</h2>
                          <table key={item} className="fl-table">
                            <thead>
                              <tr>
                                {Object.keys(
                                  dataReport.eda["describe"][item]
                                ).map((item2) => {
                                  return <th key={item2}>{item2}</th>;
                                })}
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                {Object.keys(
                                  dataReport.eda["describe"][item]
                                ).map((item3) => {
                                  return (
                                    <td key={item3}>
                                      {dataReport.eda["describe"][item][item3]}
                                    </td>
                                  );
                                })}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>

            <div className="num-main">
              <p className="num-title">Numerical Distribution</p>

              {(dataReport.eda["numerical distribution"] !== null) &
              (dataReport.eda["numerical distribution"] !== undefined) ? (
                <img
                  className="num-plot"
                  src={dataReport.eda["numerical distribution"]}
                  alt=""
                />
              ) : (
                <p className="notselected">Not Selected As A Metric</p>
              )}
            </div>
            <div className="cat-main">
              <p className="cat-title">Categorical Distribution</p>
              <div className="cat">
                {(dataReport.eda["categorical Distribution"] !== null) &
                (dataReport.eda["categorical Distribution"] !== undefined) ? (
                  <img
                    className="cat-plot cateda"
                    src={dataReport.eda["categorical Distribution"]}
                    alt=""
                  />
                ) : (
                  <p className="notselectedc">Not Selected As A Metric</p>
                )}
              </div>
            </div>

            <div className="corr-main monsalesdiv">
              <h4 className="sf-report-eda-content-title cat-title">Monthly Sales</h4>

              {(dataReport.eda["monthly sales"] !== null) &
              (dataReport.eda["monthly sales"] !== undefined) ? (
                <img
                  className="monsaleseda"
                  src={dataReport.eda["monthly sales"]}
                  alt=""
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="sf-report-engine builtdiv">
            <h1 className="sf-report-engine-title">
              Built Analysis (Prototype Modelling)
            </h1>

            <div className="sf-report-engine-content">
              <h3 className="sf-report-engine-content-title">
                {dataReport.running_results.model_name}
              </h3><br></br><br></br>
              <div className="sf-report-engine-content-forecast-table table-wrapper">
                <table className="forecast-table fl-table">
                  <thead>
                    <tr>
                      <th>Forecast Horizon</th>
                      <th>Estimation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(
                      dataReport.running_results.forecasted_sales
                    ).map((item) => {
                      return (
                        <tr key={item}>
                          <td>{item}</td>
                          <td>
                            {dataReport.running_results.forecasted_sales[item]}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <img
                  className="sf-report-forecast-plot foreplot"
                  src={dataReport.running_results.forecasted_plot}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="aa-overall-button-container">
          <p className="aa-overall-button-container-title">
            Forecast is done on dataset with selected Model!
          </p>
          <button className="aa-overall-button" onClick={handleRequest}>
            Show Results
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
