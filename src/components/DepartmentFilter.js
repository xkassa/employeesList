import React from "react";
import { useDataContext } from "./DataContext";

export const DepartmentFilter = () => {
  const { data, changeFilter } = useDataContext();

  function handleChange(input) {
    changeFilter(parseInt(input?.target?.value));
  }
  return (
    <div className="Department-Filter">
      <select onChange={handleChange} data-testid="select" >
        <option value={0} key={0}>
          All
        </option>
        {data.departmentList.map((department) => (
          <option value={department.id} key={department.id}>
            {department.departmentName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentFilter;
