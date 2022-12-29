import React from "react";
import "./employeeDetail.scss";
import { useParams } from "react-router-dom";
function EmployeeDetail() {
  const { employeeId } = useParams();
  return <div>{employeeId}</div>;
}

export default EmployeeDetail;
