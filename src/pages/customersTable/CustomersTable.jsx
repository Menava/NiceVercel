import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { useNavigate } from "react-router-dom";

import "./customersTable.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  openAddNewCustomerModal,
  openModalCustomer,
} from "../../redux/modalsAndDataSlice";
import { deleteCustomer, getCustomer } from "../../redux/Apicall";

function CustomersTable() {
  const { customers } = useSelector((state) => state.modalsAndData);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Table header list
  const headersList = [
    "No",
    "Id",
    "Customer Name",
    "Customer Phone No",
    "Actions",
  ];

  useEffect(() => {
    getCustomer(dispatch);
  }, []);

  function handleNavigatePage(id) {
    navigate(`/tables/customersTable/${id}`);
  }

  function handleSearchFunc() {
    return customers.filter(
      (customer) =>
        customer.name.includes(searchInput) ||
        customer.name.toLocaleLowerCase().includes(searchInput)
    );
  }

  function openEditModalHandle(e, data) {
    e.stopPropagation();
    dispatch(
      openModalCustomer({
        dataObj: data,
      })
    );
  }

  function openAddModalHandle() {
    dispatch(openAddNewCustomerModal());
  }

  function deleteCustomerHandle(e, id) {
    e.stopPropagation();
    deleteCustomer(id, dispatch);
  }

  const customersTableRow = handleSearchFunc().map((customer, index) => {
    return (
      <tr
        className="table_row_customers"
        key={index}
        onClick={() => handleNavigatePage(customer.id)}
      >
        <td>{index + 1}</td>
        <td>{customer.id}</td>
        <td>{customer.name}</td>
        <td>{customer.phone}</td>
        <td>
          <button
            className="table_editBtn"
            onClick={(e) => openEditModalHandle(e, customer)}
          >
            Edit
          </button>
          <button
            className="table_deleteBtn"
            onClick={(e) => deleteCustomerHandle(e, customer.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="customers">
      <Table
        addButtonName="Add New Customer"
        headersList={headersList}
        serachPlaceHolder="Search Customers"
        tablePageName="Customer Table"
        dataTableRow={customersTableRow}
        tableRowSelector="table_row_customers"
        addModalOpenHandle={openAddModalHandle}
        setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default CustomersTable;
