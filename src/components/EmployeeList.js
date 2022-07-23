import React, { useState } from "react";
import { useDataContext } from "./DataContext";
import { Button } from "react-bootstrap";
import DetailModal from "./EmployeeDetailModal";

export const EmployeeList = () => {
  const { data } = useDataContext();
  const [employeeDetail, setEmployeeDetail] = useState();

  function handleOpenDetailModal(employee) {
    setEmployeeDetail(employee);
  }
  function handleCloseDetailModal() {
    setEmployeeDetail(null);
  }

  return (
    <div className="Employee-List">
      {!!employeeDetail && (
        <DetailModal
          employee={employeeDetail}
          onClose={handleCloseDetailModal}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.sortedEmployeeList.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.departmentName}</td>
              <td>
                <Button
                  data-testid={"button" + employee.id}
                  onClick={() => handleOpenDetailModal(employee)}
                  size="sm"
                  variant="secondary"
                >
                  Detail
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
