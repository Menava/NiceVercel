import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import "./employeesTable.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  openAddNewEmployeeModal,
  openModalEmployee,
} from "../../redux/modalsAndDataSlice";
import { getEmployees } from "../../redux/Apicall";

function EmployeesTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.modalsAndData);
  const [searchInput, setSearchInput] = useState("");
  const headersList = [
    "No",
    "Id",
    "Employee Name",
    "Position",
    "Username",
    "Password",
    "Actions",
  ];

  useEffect(() => {
    getEmployees(dispatch);
  }, []);

  function handleNavigatePage(id) {
    navigate(`/tables/employeesTable/${id}`);
  }

  function openEditModalHandle(e, data) {
    e.stopPropagation();
    dispatch(
      openModalEmployee({
        dataObj: data,
      })
    );
  }

  function handleSearchFunc() {
    return employees.filter(
      (employee) =>
        employee.name.includes(searchInput) ||
        employee.name.toLocaleLowerCase().includes(searchInput)
    );
  }

  function openAddModalHandle() {
    dispatch(openAddNewEmployeeModal());
  }

  const employeesTableRow = handleSearchFunc().map((employee, index) => {
    return (
      <tr
        className="table_row_employees"
        key={index}
        onClick={() => handleNavigatePage(employee.id)}
      >
        <td>{index + 1}</td>
        <td>{employee.id}</td>
        <td>{employee.name}</td>
        <td>{employee.position}</td>
        <td>{employee.username}</td>
        <td>{employee.password}</td>
        <td>
          <button
            className="table_editBtn"
            onClick={(e) => openEditModalHandle(e, employee)}
          >
            Edit
          </button>
          <button className="table_deleteBtn">Delete</button>
        </td>
      </tr>
    );
  });

  return (
    <div className="employees">
      <Table
        tablePageName="Employees Table"
        headersList={headersList}
        addButtonName="Add New Employee"
        serachPlaceHolder="Search Employees"
        dataTableRow={employeesTableRow}
        tableRowSelector="table_row_employees"
        addModalOpenHandle={openAddModalHandle}
        handleSearchFunc={handleSearchFunc}
        setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default EmployeesTable;
