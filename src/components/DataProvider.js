import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DataContextProvider } from "./DataContext";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const propTypes = {
  baseUri: PropTypes.string.isRequired,
};
const defaultProps = {
  baseUri: "",
};

export const DataProvider = (props) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function loadData() {
      let employeeList, departmentList;
      try {
        employeeList = (await axios.get(props.baseUri + "/employees")).data;
        departmentList = (await axios.get(props.baseUri + "/departments")).data;
        employeeList.forEach((employee) => {
          employee.departmentName = departmentList.find(
            ({ id }) => id === employee.departmentId
          ).departmentName;
        });
      } catch (e) {
        console.error(e);
        setError(e);
      }
      setData({
        employeeList,
        departmentList,
        sortedEmployeeList: employeeList,
      });
    }
    loadData();
  }, [props.baseUri]);

  function changeFilter(value) {
    setData((data) => ({
      ...data,
      sortedEmployeeList:
        value === 0
          ? data.employeeList
          : data.employeeList.filter(
              (employee) => employee.departmentId === value
            ),
    }));
  }
  const values = { data, changeFilter };

  if (error) return <>{error.message ?? "Failed to load data"}</>;

  if (!data)
    return (
      <>
        Loading...
        <br />
        <Spinner animation="border" />
      </>
    );

  return (
    <DataContextProvider value={values}>
      {typeof props.children === "function"
        ? props.children(data)
        : props.children}
    </DataContextProvider>
  );
};

DataProvider.propTypes = propTypes;
DataProvider.defaultProperties = defaultProps;

export default DataProvider;
