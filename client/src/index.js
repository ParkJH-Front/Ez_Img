import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./css/default.css";
import Wellcome from "./component/wellcome";
import Main from "./component/main";
import Login from "./component/login";
import Test from "./component/test";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Wellcome />} />
      <Route path="/main:text" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  </BrowserRouter>
);
