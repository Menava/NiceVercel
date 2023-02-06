import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeneralIncomeService from "../../APIServices/GeneralIncome";
import Table from "../../components/table/Table";
import { getGeneralPurchases } from "../../redux/Apicall";
import {
  getAllIncomes,
  openEditIncomeModal,
  openIncomeModal,
  openDeleteIncomeModal,
} from "../../redux/modalsAndDataSlice";

function IncomeTable() {
  const headersList = [
    "No",
    "Id",
    "Income Amount",
    "Description",
    "Type",
    "Date",
    "Actions",
  ];
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const { allIncomes, incomeInitialValues } = useSelector(
    (state) => state.modalsAndData
  );

  useEffect(() => {
    async function getIncomes() {
      await GeneralIncomeService.GetGeneralIncomes().then((res) => {
        dispatch(getAllIncomes({ data: res }));
      });
    }
    getIncomes();
  }, []);

  const openEditModal = (id, description, amount, incomeType) => {
    dispatch(openEditIncomeModal({ id, description, amount, incomeType }));
  };

  const openDeleteModal = (toChangeId) => {
    dispatch(openDeleteIncomeModal({ data: toChangeId }));
  };

  const generalIncomesTable = allIncomes.map((gp, index) => {
    return (
      <tr className="table_row_generalPurchases" key={gp.id}>
        <td>{index + 1}</td>
        <td>{gp.id}</td>
        <td>{gp.description}</td>
        <td>{gp.amount}</td>
        <td>{gp.income_type}</td>
        <td>{gp.income_date}</td>
        <td>
          <button
            className="table_editBtn"
            onClick={() =>
              openEditModal(gp.id, gp.description, gp.amount, gp.income_type)
            }
          >
            Edit
          </button>
          <button
            className="table_deleteBtn"
            onClick={() => openDeleteModal(gp.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

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
        dataTableRow={generalIncomesTable}
        // tableRowSelector="table_row_generalPurchases"
        addModalOpenHandle={openIncomeModalHandle}
        setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default IncomeTable;
