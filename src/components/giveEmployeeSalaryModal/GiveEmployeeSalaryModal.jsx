import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees, getEmployeeSalareis } from "../../redux/Apicall";
import { BsSearch } from "react-icons/bs";
import { closeModal } from "../../redux/modalsAndDataSlice";
import "./giveEmployeeSalaryModal.scss";
import EmployeePayrollService from "../../APIServices/EmployeePayrollAPI";

function GiveEmployeeSalaryModal() {
  const { employees } = useSelector((state) => state.modalsAndData);
  const [employeeSalaryValues, setEmployeeSalaryValues] = useState({
    Salary: "",
  });
  const [seacrhInputEmployee, setSearchInputEmployee] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState({
    name: "",
    id: "",
  });
  //   const [employees, setEmployees] = useState();
  const backgroundRef = useRef();
  const dispatch = useDispatch();
  function closeModalHandle(e) {
    if (e.target === backgroundRef.current) {
      dispatch(closeModal());
    }
  }

  useEffect(() => {
    getEmployees(dispatch);
  }, []);

  function unSelectEmployeeHandle() {
    setSelectedEmployee({ name: "", id: "" });
  }

  function filterEmployeesHandle() {
    const copiedEmployees = [...employees];

    return copiedEmployees.filter(
      (emp) =>
        emp.name.includes(seacrhInputEmployee) ||
        emp.name.toLocaleLowerCase().includes(seacrhInputEmployee) ||
        emp.name.toLocaleUpperCase().includes(seacrhInputEmployee)
    );
  }

  function selectEmployeeHandle(name, id) {
    setSelectedEmployee({ name, id });
  }

  function onChangeHandle(e, toChangeProperty) {
    const inputValue = e.target.value;
    setEmployeeSalaryValues({
      ...employeeSalaryValues,
      [toChangeProperty]: inputValue,
    });
  }

  async function giveSalaryHandle() {
    if (
      selectedEmployee.id === "" ||
      selectedEmployee.name === "" ||
      employeeSalaryValues.Salary === "" ||
      isNaN(employeeSalaryValues.Salary)
    ) {
      alert("Please check again");
    } else {
      await EmployeePayrollService.InsertEmployeePayroll({
        salary_amount: employeeSalaryValues.Salary,
        employee_id: selectedEmployee.id,
      });
      getEmployeeSalareis(dispatch);
      dispatch(closeModal());
    }
  }

  return (
    <div
      className="giveEmployeeSalaryModal_wrapper"
      ref={backgroundRef}
      onClick={closeModalHandle}
    >
      <div className="giveEmployeeSalaryModal">
        <h2>Give Salary</h2>

        {selectedEmployee.name !== "" ? (
          <div className="employeeSalaryInput_wrapper">
            <label>Employee</label>
            <input type="text" value={selectedEmployee.name} disabled />
            <div
              className="employeeSalaryInput_remvoeIconWrapper"
              onClick={unSelectEmployeeHandle}
            >
              <ImCross className="employeeSalaryInput_remvoeIcon" />
            </div>
          </div>
        ) : (
          <div className="employees_wrapper">
            <div className="employees_searchBarWrapper">
              <div className="search_wrapper">
                <BsSearch className="employees_searchIcon" />
                <input
                  type="text"
                  alt="supplierInput"
                  placeholder="Search Employee.."
                  value={seacrhInputEmployee}
                  onChange={(e) => setSearchInputEmployee(e.target.value)}
                />
              </div>
              <div className="employees">
                {filterEmployeesHandle().map((emp) => (
                  <div
                    key={emp.id}
                    className="employee"
                    onClick={() => selectEmployeeHandle(emp.name, emp.id)}
                  >
                    <p>{emp.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="input_wrapper">
          {Object.keys(employeeSalaryValues).map((item, index) => (
            <div className="employeeSalary_input" key={index}>
              <label>{item}</label>
              <input
                type="text"
                value={employeeSalaryValues[item]}
                onChange={(e) => onChangeHandle(e, item)}
              />
            </div>
          ))}
        </div>
        <button className="give_salaryBtn" onClick={giveSalaryHandle}>
          Give Salary
        </button>
      </div>
    </div>
  );
}

export default GiveEmployeeSalaryModal;
