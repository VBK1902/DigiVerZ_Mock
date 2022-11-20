import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/common/navbar";
import { Landingpage } from "./components/common/landingpage";
import { Upload } from "./components/dqr/upload";
import { Report } from "./components/dqr/report";
import { History } from "./components/dqr/history";
import { UploadMB } from "./components/mb/uploadmb";
import { ReportMB } from "./components/mb/reportmb";
import { UploadSF } from "./components/sf/uploadsf";
import { ReportSF } from "./components/sf/reportsf";
import { UploadAA } from "./components/aa/uploadaa";
import { ReportAA } from "./components/aa/reportaa";

import "./App.css";

export const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landingpage />}></Route>
        <Route path="dqr">
          <Route index element={<Upload />}></Route>
          <Route path="report" element={<Report />}></Route>
          <Route path="history" element={<History />}></Route>
        </Route>
        <Route path="mb">
          <Route index element={<UploadMB />}></Route>
          <Route path="report" element={<ReportMB />}></Route>
        </Route>
        <Route path="sf">
          <Route index element={<UploadSF />}></Route>
          <Route path="report" element={<ReportSF />}></Route>
        </Route>
        <Route path="aa">
          <Route index element={<UploadAA />}></Route>
          <Route path="report" element={<ReportAA />}></Route>
        </Route>
      </Routes>
    </div>
  );
};
