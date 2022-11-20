import React from "react";
import "./landingpage.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assests/home-chart.png";
import foot from "../../assests/undraw_bookmarks_r6up.png";

export const Landingpage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="land">
        <div className="logotxt">
          <p>Make your business more profitable</p>
          <p className="subtxt">Build absolute analytical solutions with us!</p>
          <Link to="dqr">
            <button className="custom-btn1 btn-9">Get Started!</button>
          </Link>
        </div>
        <img src={logo} alt="" className="landimg" />
      </div>

      <div className="header">
        <h1>OUR FEATURES</h1>
        <p>
          Leveraging the use of Analytics and Machine learning concepts to solve
          real world business problems.
        </p>
      </div>
      <div className="row1-container height">
        <div className="box box-down cyan" onClick={() => navigate("dqr")}>
          <h2>Data Quality Reporter</h2>
          <p>
            Various data exploratory analysis are done and provides a report.
          </p>
          <img
            className="dqrimg"
            src="https://cdn-icons-png.flaticon.com/512/2328/2328966.png"
            alt=""
          />
        </div>

        <div className="box red" onClick={() => navigate("mb")}>
          <h2>Model Builder</h2>
          <p>Provides solution for one specific real time business problem.</p>
          <img
            className="mbimg"
            src="https://cdn-icons-png.flaticon.com/512/3112/3112425.png"
            alt=""
          />
        </div>

        <div className="box box-down blue" onClick={() => navigate("sf")}>
          <h2>Sales Forecasting</h2>
          <p>Future sales is forecasted using any time series algorithm.</p>
          <img
            className="sfimg"
            src="https://cdn-icons-png.flaticon.com/512/7687/7687667.png"
            alt=""
          />
        </div>
      </div>
      <div className="row2-container height2">
        <div className="box orange" onClick={() => navigate("aa")}>
          <h2>Algorithm Analyzer</h2>
          <p>
            Analysis of different machine learning algorithms for a dataset.
          </p>
          <img
            className="aaimg"
            src="https://cdn-icons-png.flaticon.com/512/2586/2586703.png"
            alt=""
          />
        </div>
      </div>
      <div className="footer">
        <img src={foot} alt="" className="footimg" />
        <div className="foottxt">
          <h1>ABOUT US</h1>
          <h1 className="comp">KAAR TECHNOLOGIES PVT LTD.,</h1>
          <h3 className="loc">India</h3>
          <p>Level 8,Shyamala Towers, No 136,Arcot Road, Chennai- 600 093</p>
          <h3 className="loc">India (Delivery Center)</h3>
          <p>
            2nd Floor, 3rd Module, Neville Tower, TRIL Infopark Ltd,<br></br>{" "}
            Rajiv Gandhi Salai (OMR), Taramani, Chennai- 600 113
          </p>
          <h1 className="cont">CONTACT US</h1>
          <div className="social">
            <a
              href="https://www.instagram.com/kaar_tech/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1409/1409946.png"
                alt=""
              />
            </a>

            <a
              href="https://twitter.com/kaartech"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1409/1409937.png"
                alt=""
              />
            </a>

            <a
              href="https://m.facebook.com/kaartech/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174848.png"
                alt=""
              />
            </a>

            <a
              href="https://www.linkedin.com/company/kaar-tech/mycompany/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png"
                alt=""
              />
            </a>

            <a
              href="https://www.youtube.com/user/Kaartech"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                alt=""
              />
            </a>

            <a
              href="https://www.kaartech.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/431/431979.png"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
      <p className="copyrights">
        Copyright &copy; 2022 Kaar Tech, All Rights Reserved
      </p>
    </div>
  );
};
