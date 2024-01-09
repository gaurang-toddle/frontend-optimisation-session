import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App1 from "./App1/App";
import SlowRenderIssue from "./SlowRenderIssue";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SlowRenderIssue />
  </React.StrictMode>
);
