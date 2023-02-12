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

function GeneralPurchasesTable({
  generalPurchase,
  setGeneralPurchase,
  purchaseOptions,
  setPurchaseOptions,
  selectedPurchaseOptions,
  setSelectedPurchaseOptions,
  toEditGeneralPurchaseId,
  setToEditGeneralPurchaseId,
  selectedBusinessOption,
  setSelectedBusinessOption,
}) {
  const headersList = [
    "No",
    "Id",
    "General Purchase",
    "Type",
    "Business",
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
    setGeneralPurchase({ Description: "", Price: "", Quantity: "" });
    setPurchaseOptions({
      Cooking: "",
      General: "",
      Food: "",
      Tax: "",
      Donation: "",
      "Health Care": "",
    });
    setSelectedPurchaseOptions("");
    setToEditGeneralPurchaseId("");
  }

  function openEditGeneralPurchaseHandle(
    description,
    quantity,
    unitPrice,
    purchaseType,
    toEditId,
    businessType
  ) {
    dispatch(openEditGeneralPurchaseModal());
    setGeneralPurchase({
      Description: description,
      Price: unitPrice,
      Quantity: quantity,
    });
    setSelectedPurchaseOptions(purchaseType);
    setSelectedBusinessOption(businessType);
    setToEditGeneralPurchaseId(toEditId);
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
        <td>{gp.purchase_type}</td>
        <td>{gp.business_type}</td>
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
                gp.purchase_type,
                gp.id,
                gp.business_type
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
        // searchBy="Search By Month"
        tablePageName="General Purchases Table"
        headersList={headersList}
        serachPlaceHolder="Search purchase"
        // searchByHandle={searchByMonthHandle}
        dataTableRow={generalPurchasesTableRow}
        tableRowSelector="table_row_generalPurchases"
        addModalOpenHandle={openAddGeneralPurchaseHandle}
        setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default GeneralPurchasesTable;
