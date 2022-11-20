import React, { useState, useEffect } from "react";
import { dqr_api } from "../../utils/routes_config";
import "./history.css";
import { DataGrid } from "@mui/x-data-grid";
import dqrreport from "../../assests/report.png";

export const History = () => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const cols = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 250,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "fileName",
      headerName: "File Name",
      minWidth: 350,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "fileType",
      headerName: "File Type",
      minWidth: 250,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "sheetName",
      headerName: "Sheet Name",
      minWidth: 150,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "date",
      headerName: "Date",
      minWidth: 415.5,
      headerClassName: "super-app-theme--header",
    },
  ];
  const [dataFinal, setDataFinal] = useState({});

  useEffect(() => {
    setSpinner(true);
    dqr_api.get("/history").then(({ data }) => {
      console.log(data);
      let temp = data.data.map((item) => {
        Object.defineProperty(
          item,
          "id",
          Object.getOwnPropertyDescriptor(item, "_id")
        );
        delete item["_id"];
        return item;
      });
      setData(temp);
      setSpinner(false)
      console.log(temp);
    });
  }, []);

  const handleView = (data) => {
    console.log(data.id);
    dqr_api.get("/view/" + data.id).then(({ data }) => {
      console.log(data);
      setDataFinal(data.data.data);
    });
  };

  return (
    <div className="historycontainer">
      <p className="history-page-title report-title">HISTORY</p>
      {spinner ? (
        <h2 class="animatehis">Loading</h2>
      ) : (
        <>
        <div className="table">
        <DataGrid
          sx={{
            backgroundColor: "white",
            border: "5px solid black",
            color: "black",
          }}
          rows={data}
          columns={cols}
          pageSize={8}
          autoHeight={true}
          onRowClick={(data) => {
            handleView(data);
          }}
        />
      </div>

      {Object.keys(dataFinal).length > 0 ? (
        <>
          <div className="dim1 cyan">
            <h2>Dimension</h2>
            <p className="ptext">
              {(dataFinal["shape"] !== null) &
              (dataFinal["shape"] !== undefined) ? (
                <span>
                  <span>{dataFinal["shape"][0]}, </span>
                  <span> {dataFinal["shape"][1]}</span>
                </span>
              ) : (
                <p className="ptext">Not Selected</p>
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
              {(dataFinal["complete"] !== null) &
              (dataFinal["complete"] !== undefined) ? (
                <p className="ptext">{dataFinal["complete"]}</p>
              ) : (
                <p className="ptext">Not Selected</p>
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
              {(dataFinal["unique"] !== null) &
              (dataFinal["unique"] !== undefined) ? (
                <p className="ptext">{dataFinal["unique"]}</p>
              ) : (
                <p className="ptext">Not Selected</p>
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
          <div className="schema">
            {(dataFinal["schema"] !== null) &
            (dataFinal["schema"] !== undefined)
              ? dataFinal["schema"].map((item, index) => {
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
              {(dataFinal["describe"] !== null) &
              (dataFinal["describe"] !== undefined)
                ? Object.keys(dataFinal["describe"]).map((item) => {
                    return (
                      <div className="table-wrapper">
                        <h2 className="tableheading">{item}</h2>
                        <table key={item} className="fl-table">
                          <thead>
                            <tr>
                              {Object.keys(dataFinal["describe"][item]).map(
                                (item2) => {
                                  return <th key={item2}>{item2}</th>;
                                }
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {Object.keys(dataFinal["describe"][item]).map(
                                (item3) => {
                                  return (
                                    <td key={item3}>
                                      {dataFinal["describe"][item][item3]}
                                    </td>
                                  );
                                }
                              )}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
          <div className="corr-main">
            <p className="corr-title">Correlation Heat Map</p>
            {(dataFinal["corr"] !== null) &
            (dataFinal["corr"] !== undefined) ? (
              <img
                className="corr"
                src={"data:image/jpg;base64," + dataFinal["corr"]}
                alt=""
              />
            ) : (
              ""
            )}
          </div>
          <div className="num-main">
            <p className="num-title">Numerical Distribution</p>

            {(dataFinal["num_dist"] !== null) &
            (dataFinal["num_dist"] !== undefined) ? (
              <img
                className="num-plot"
                src={"data:image/jpg;base64," + dataFinal["num_dist"]}
                alt=""
              />
            ) : (
              <p className="notselected">Not Selected As A Metric</p>
            )}
          </div>
          <div className="cat-main">
            <p className="cat-title">Categorical Distribution</p>
            <div className="cat">
              {(dataFinal["cat_dist"] !== null) &
              (dataFinal["cat_dist"] !== undefined) ? (
                Object.keys(dataFinal["cat_dist"]).map((item, index) => {
                  return (
                    <img
                      className="cat-plot"
                      key={index}
                      src={
                        "data:image/jpg;base64," + dataFinal["cat_dist"][item]
                      }
                      alt=""
                    />
                  );
                })
              ) : (
                <p className="notselectedc">Not Selected As A Metric</p>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
        // <>
        //   <p className="nometrics">No Metrics Selected!</p>
        //   <img className="dqrreportimg" src={dqrreport} alt=""></img>
        // </>
      )}
        </>
      )}
      
      
    </div>
  );
};
