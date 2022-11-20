import React, { useEffect, useState } from "react";
import "./report.css";
import { dqr_api } from "../../utils/routes_config";
import dqrreport from "../../assests/report.png";

export const Report = () => {
  const [spinner, setSpinner] = useState(false);
  const [dataFinal, setData] = useState({});
  useEffect(() => {
    const search = async () => {
      setSpinner(true);
      const { data } = await dqr_api.get("/process");
      console.log(data);
      setData(data.data);
      setSpinner(false);
    };
    search();
  }, []);

  return (
    <div>
      {spinner ? (
        <h2 class="animate">Loading</h2>
      ) : (
        <>
          {<p className="reporthead">FINAL REPORT</p>}
          {Object.keys(dataFinal).length > 0 ? (
            <>
              <div className="dim cyan">
                <h2>Dimension</h2>
                <p className="ptext">
                  {(dataFinal["shape"] !== null) &
                  (dataFinal["shape"] !== undefined) ? (
                    <span>
                      <span>{dataFinal["shape"][0]}, </span>
                      <span> {dataFinal["shape"][1]}</span>
                    </span>
                  ) : (
                    <p className="ptextnot" style={{textAlign:"left"}}>Not Selected</p>
                  )}
                </p>
                <img
                  className="dqrimg1"
                  src="https://cdn-icons-png.flaticon.com/512/4560/4560926.png"
                  alt=""
                />
              </div>
              <div className="com red">
                <h2>Completeness</h2>
                <p>
                  {(dataFinal["complete"] !== null) &
                  (dataFinal["complete"] !== undefined) ? (
                    <p className="ptext">{dataFinal["complete"]}</p>
                  ) : (
                    <p className="ptextnot" style={{textAlign:"left"}}>Not Selected</p>
                  )}
                </p>
                <img
                  className="mbimg1"
                  src="https://cdn-icons-png.flaticon.com/512/3368/3368863.png"
                  alt=""
                />
              </div>
              <div className="uniq blue">
                <h2>Uniqueness</h2>
                <p>
                  {(dataFinal["unique"] !== null) &
                  (dataFinal["unique"] !== undefined) ? (
                    <p className="ptext">{dataFinal["unique"]}</p>
                  ) : (
                    <p className="ptextnot"style={{textAlign:"left"}}>Not Selected</p>
                  )}
                </p>
                <img
                  className="sfimg1"
                  src="https://cdn-icons-png.flaticon.com/512/5992/5992420.png"
                  alt=""
                />
              </div>
              <img className="dqrreportimg" src={dqrreport} alt=""></img>
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
                  : <p className="ptextnot">Not Selected As A Metric</p>}
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
                    : <p className="ptextnot">Not Selected As A Metric</p>}
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
                  <p className="ptextnot">Not Selected As A Metric</p>
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
                  <p className="ptextnot">Not Selected As A Metric</p>
                )}
              </div>
              <div className="cat-main">
                <p className="cat-title">Categorical Distribution</p>
                <div className="cat">
                  {(dataFinal["cat_dist"] !== null) &
                  (dataFinal["cat_dist"] !== undefined)
                    ? Object.keys(dataFinal["cat_dist"]).map((item, index) => {
                        return (
                          <img
                            className="cat-plot"
                            key={index}
                            src={
                              "data:image/jpg;base64," +
                              dataFinal["cat_dist"][item]
                            }
                            alt=""
                          />
                        );
                      })
                    : <p className="ptextnot">Not Selected As A Metric</p>}
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="nometrics">No Metrics Selected!</p>
              <img className="dqrreportimg" src={dqrreport} alt=""></img>
            </>
          )}
        </>
      )}
    </div>
  );
};
