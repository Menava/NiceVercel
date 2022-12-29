import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { useNavigate } from "react-router-dom";

import "./suppliersTable.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  openModalSupplier,
  openAddModalSupplier,
} from "../../redux/modalsAndDataSlice";
import { getSuppliers } from "../../redux/Apicall";

function SuppliersTable() {
  const { suppliers } = useSelector((state) => state.modalsAndData);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Table header list
  const headersList = ["No", "Id", "Supplier Name", "Actions"];

  useEffect(() => {
    getSuppliers(dispatch);
  }, []);

  function handleNavigatePage(id) {
    navigate(`/tables/suppliersTable/${id}`);
  }

  function openEditModalHandle(e, data) {
    e.stopPropagation();
    dispatch(
      openModalSupplier({
        dataObj: data,
      })
    );
  }

  function handleSearchFunc() {
    return suppliers.filter(
      (supplier) =>
        supplier.name.includes(searchInput) ||
        supplier.name.toLocaleLowerCase().includes(searchInput)
    );
  }

  function openAddModalHandle() {
    dispatch(openAddModalSupplier());
  }

  function deleteSupplierHandle(e, id) {
    e.stopPropagation();
    // deleteCustomer(id, dispatch);
  }

  const supplierTableRow = handleSearchFunc().map((supplier, index) => {
    return (
      <tr
        className="table_row_supplier"
        key={index}
        onClick={() => handleNavigatePage(supplier.id)}
      >
        <td>{index + 1}</td>
        <td>{supplier.id}</td>
        <td>{supplier.name}</td>
        <td>
          <button
            className="table_editBtn"
            onClick={(e) => openEditModalHandle(e, supplier)}
          >
            Edit
          </button>
          <button
            className="table_deleteBtn"
            onClick={(e) => deleteSupplierHandle(e, supplier.id)}
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
        tablePageName="Supplier Table"
        headersList={headersList}
        addButtonName="Add New Supplier"
        serachPlaceHolder="Search Suppliers"
        dataTableRow={supplierTableRow}
        tableRowSelector="table_row_supplier"
        addModalOpenHandle={openAddModalHandle}
        handleSearchFunc={handleSearchFunc}
        setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default SuppliersTable;
