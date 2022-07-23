import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
const BASE_URI = "http://localhost:3001";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App baseUri={BASE_URI} />
  </React.StrictMode>,
);

serviceWorker.unregister();
