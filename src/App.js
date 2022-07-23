import React from "react";
import "./App.css";
import { EmployeeList, DataProvider, DepartmentFilter } from "./components";
import PropTypes from "prop-types";

const propTypes = {
  baseUri: PropTypes.string.isRequired,
};
const defaultProps = {
  baseUri: "",
};

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee list</h1>
      </header>
      <div className="Content">
        <DataProvider baseUri={props.baseUri}>
          <DepartmentFilter />
          <EmployeeList />
        </DataProvider>
      </div>
    </div>
  );
}

App.propTypes = propTypes;
App.defaultProperties = defaultProps;

export default App;
