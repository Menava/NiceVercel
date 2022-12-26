import React, { useState } from "react";
import { useEffect } from "react";
import Table from "../../components/table/Table";
import ServicePlaceService from "../../APIServices/ServicePlaceAPI";
import { useDispatch, useSelector } from "react-redux";
import { openWaitingModal } from "../../redux/modalsAndDataSlice";
import { useRef } from "react";
import { getWaitingLists } from "../../redux/Apicall";

function WaitingListsTable() {
  const headersList = ["No", "Customer Name", "Car No", "Actions"];
  const { waitingLists } = useSelector((state) => state.modalsAndData);
  const dispatch = useDispatch();

  useEffect(() => {
    getWaitingLists(dispatch);
  }, [dispatch]);

  console.log("WaitingList", waitingLists);

  const waitingListsTableRow = waitingLists
    ?.filter((wtList) => wtList.name.includes("Waiting"))
    .map((list, index) => {
      return (
        <tr className="table_row_customers" key={index}>
          <td>{index + 1}</td>
          <td>{list?.customerCar_id?.customer.name}</td>
          <td>{list?.customerCar_id?.car.car_number}</td>
          <td>
            <button
              className="refund_btn"
              onClick={() => {
                dispatch(openWaitingModal(list));
              }}
            >
              Service
            </button>
            <button className="table_deleteBtn">Delete</button>
          </td>
        </tr>
      );
    });

  return (
    <div className="waitingListsTable">
      <Table
        headersList={headersList}
        serachPlaceHolder="Search Waiting List"
        tablePageName="Waiting List Table"
        dataTableRow={waitingListsTableRow}
        // tableRowSelector="table_row_customers"
        // addModalOpenHandle={openAddModalHandle}
        // setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default WaitingListsTable;
