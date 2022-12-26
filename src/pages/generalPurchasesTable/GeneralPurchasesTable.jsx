import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table/Table";
import { getGeneralPurchases } from "../../redux/Apicall";
import {
  openDeleteGeneralPurchaseModal,
  openEditGeneralPurchaseModal,
  openGeneralPurhcaseModal,
} from "../../redux/modalsAndDataSlice";

function GeneralPurchasesTable() {
  const headersList = [
    "No",
    "Id",
    "General Purchase",
    "Quantity",
    "Price",
    "Amount",
    "Date",
    "Actions",
  ];
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const { generalPurchases } = useSelector((state) => state.modalsAndData);
  console.log(generalPurchases);
  function searchByMonthHandle() {
    console.log("Search By Month");
  }

  function openAddGeneralPurchaseHandle() {
    dispatch(openGeneralPurhcaseModal());
  }

  function openEditGeneralPurchaseHandle(
    description,
    quantity,
    unitPrice,
    toEditId
  ) {
    dispatch(
      openEditGeneralPurchaseModal({
        description,
        quantity,
        unitPrice,
        toEditId,
      })
    );
  }

  function deleteGeneralPurchaseHandle(toDeleteId) {
    dispatch(openDeleteGeneralPurchaseModal({ toDeleteId }));
  }

  useEffect(() => {
    getGeneralPurchases(dispatch);
  }, [dispatch]);

  const generalPurchasesTableRow = generalPurchases.map((gp, index) => {
    return (
      <tr className="table_row_generalPurchases" key={gp.id}>
        <td>{index + 1}</td>
        <td>{gp.id}</td>
        <td>{gp.description}</td>
        <td>{gp.quantity}</td>
        <td>{gp.unit_price}</td>
        <td>{gp.total}</td>
        <td>{gp.purchase_date}</td>
        <td>
          <button
            className="table_editBtn"
            onClick={() =>
              openEditGeneralPurchaseHandle(
                gp.description,
                gp.quantity,
                gp.unit_price,
                gp.id
              )
            }
          >
            Edit
          </button>
          <button
            className="table_deleteBtn"
            onClick={() => deleteGeneralPurchaseHandle(gp.id)}
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
        addButtonName="Add General Purchase"
        searchByMonth="Search By Month"
        tablePageName="Employees Salaries Table"
        headersList={headersList}
        serachPlaceHolder="Search purchase"
        searchByMonthHandle={searchByMonthHandle}
        dataTableRow={generalPurchasesTableRow}
        tableRowSelector="table_row_generalPurchases"
        addModalOpenHandle={openAddGeneralPurchaseHandle}
        setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default GeneralPurchasesTable;
