import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/responsive.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
