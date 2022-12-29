import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeePayrollService from "../../APIServices/EmployeePayrollAPI";
import Table from "../../components/table/Table";
import { getEmployeeSalareis } from "../../redux/Apicall";
import {
  openGiveSalaryModal,
  openDeleteEmployeeSalaryModal,
  openEditEmployeeSalryModal,
} from "../../redux/modalsAndDataSlice";

function EmployeeSalariesTable() {
  const headersList = [
    "No",
    "Id",
    "Employee Name",
    "Salary",
    "Date",
    "Actions",
  ];
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const { employeeSalaries } = useSelector((state) => state.modalsAndData);

  function searchByMonthHandle() {
    console.log("Search By Month");
  }

  function openGiveSalaryModalHandle() {
    dispatch(openGiveSalaryModal());
  }

  function openDeleteSalaryModalHandle(employeeId) {
    dispatch(
      openDeleteEmployeeSalaryModal({ toDeleteEmployeeSalaryId: employeeId })
    );
  }
  function openEditSalaryModalHandle(salary, id) {
    dispatch(
      openEditEmployeeSalryModal({
        prevSalary: salary,
        toEditEmployeeSalaryId: id,
      })
    );
  }

  useEffect(() => {
    getEmployeeSalareis(dispatch);
  }, []);
  console.log("employeeSalaries", employeeSalaries);
  const employeeSalariesTableRow = employeeSalaries.map((employee, index) => {
    return (
      <tr className="table_row_employeeSalaries" key={employee.id}>
        <td>{index + 1}</td>
        <td>{employee.id}</td>
        <td>{employee.employee_id.name}</td>
        <td>{employee.salary_amount}</td>
        <td>{employee.paid_date}</td>
        <td>
          <button
            className="table_editBtn"
            onClick={(e) =>
              openEditSalaryModalHandle(employee.salary_amount, employee.id)
            }
          >
            Edit
          </button>
          <button
            className="table_deleteBtn"
            onClick={(e) => openDeleteSalaryModalHandle(employee.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Table
        addButtonName="Give Salary"
        searchByMonth="Search By Month"
        tablePageName="Employees Salaries Table"
        headersList={headersList}
        serachPlaceHolder="Search Employee"
        searchByMonthHandle={searchByMonthHandle}
        dataTableRow={employeeSalariesTableRow}
        tableRowSelector="table_row_employeeSalaries"
        addModalOpenHandle={openGiveSalaryModalHandle}
        // handleSearchFunc={handleSearchFunc}
        setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default EmployeeSalariesTable;
