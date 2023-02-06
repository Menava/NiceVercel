import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table/Table";
import { getGeneralPurchases } from "../../redux/Apicall";
import {
  openDeleteGeneralPurchaseModal,
  openEditGeneralPurchaseModal,
  openGeneralPurhcaseModal,
  openIncomeModal,
} from "../../redux/modalsAndDataSlice";

function IncomeTable() {
  const headersList = ["No", "Id", "Income Amount", "Type", "Date", "Actions"];
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const { incomes, incomeInitialValues } = useSelector(
    (state) => state.modalsAndData
  );
  console.log("incomes", incomes);
  // const generalPurchasesTableRow = generalPurchases.map((gp, index) => {
  //   return (
  //     <tr className="table_row_generalPurchases" key={gp.id}>
  //       <td>{index + 1}</td>
  //       <td>{gp.id}</td>
  //       <td>{gp.description}</td>
  //       <td>{gp.purchase_type}</td>
  //       <td>{gp.quantity}</td>
  //       <td>{gp.unit_price}</td>
  //       <td>{gp.total}</td>
  //       <td>{gp.purchase_date}</td>
  //       <td>
  //         <button
  //           className="table_editBtn"
  //           onClick={() =>
  //             openEditGeneralPurchaseHandle(
  //               gp.description,
  //               gp.quantity,
  //               gp.unit_price,
  //               gp.purchase_type,
  //               gp.id
  //             )
  //           }
  //         >
  //           Edit
  //         </button>
  //         <button
  //           className="table_deleteBtn"
  //           onClick={() => deleteGeneralPurchaseHandle(gp.id)}
  //         >
  //           Delete
  //         </button>
  //       </td>
  //     </tr>
  //   );
  // });
  function openIncomeModalHandle() {
    dispatch(openIncomeModal());
  }

  return (
    <div>
      <Table
        addButtonName="Add Income"
        // searchBy="Search By Month"
        tablePageName="Employees Salaries Table"
        headersList={headersList}
        serachPlaceHolder="Search income"
        // searchByHandle={searchByMonthHandle}
        // dataTableRow={generalPurchasesTableRow}
        // tableRowSelector="table_row_generalPurchases"
        addModalOpenHandle={openIncomeModalHandle}
        setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default IncomeTable;
