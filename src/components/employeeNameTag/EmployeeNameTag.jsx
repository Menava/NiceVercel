import React from "react";
import "./employeeNameTag.scss";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { removeEmployee } from "../../redux/prepareServiceInputSlice";
function EmployeeNameTag({ employeeName, id }) {
  const dispatch = useDispatch();

  function handleRemoveEmployee() {
    dispatch(removeEmployee({ id }));
  }
  return (
    <div className="employeeNameTag">
      <h4>{employeeName}</h4>
      <div
        className="employeeNameTag_removeIconWrapper"
        onClick={handleRemoveEmployee}
      >
        <ImCross className="employeeNameTag_removeIcon" />
      </div>
    </div>
  );
}

export default EmployeeNameTag;
