import React from "react";
import PropTypes from "prop-types";
import { Col, Modal, Row } from "react-bootstrap";

const propTypes = {
  onClose: PropTypes.func.isRequired,
  employee: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
    departmentName: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }).isRequired,
};

const defaultProps = {
  onClose: () => {},
  employee: {
    name: "",
    age: null,
    departmentName: "",
    startDate: "",
    endDate: "",
  },
};

const EmployeeDetailModal = (props) => {
  const employee = props.employee;
  return (
    <Modal show onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Employee detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>Name: </Col>
          <Col>{employee.name.split(" ")[0]}</Col>
        </Row>
        <Row>
          <Col>Surname: </Col>
          <Col>{employee.name.split(" ")[1]}</Col>
        </Row>
        <Row>
          <Col>Age: </Col>
          <Col>{employee.age}</Col>
        </Row>
        <Row>
          <Col>Department: </Col>
          <Col>{employee.departmentName}</Col>
        </Row>
        <Row>
          <Col>Start date: </Col>
          <Col>{dateFormatter(employee.startDate)}</Col>
        </Row>
        {!!employee.endDate && (
          <Row>
            <Col>End date: </Col>
            <Col>{dateFormatter(employee.endDate)}</Col>
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
};

const dateFormatter = (dbDate) =>
  new Date(dbDate + "T00:00:00.000Z").toLocaleDateString("cs-Cs");

EmployeeDetailModal.propTypes = propTypes;
EmployeeDetailModal.defaultProperties = defaultProps;

export default EmployeeDetailModal;
