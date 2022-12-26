import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/table/Table";
import VoucherService from "../../APIServices/VoucherAPI";
import "./vouchersTable.scss";

import { openPayModal } from "../../redux/modalsAndDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { getVouchers } from "../../redux/Apicall";

function VouchersTable() {
  const navigate = useNavigate();
  const { vouchers } = useSelector((state) => state.modalsAndData);

  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const headersList = [
    "VoucherId",
    "CustomerName",
    "CustomerPhoneNo",
    "Car",
    "CarNo",
    "Date",
    "Total",
    "Paid Amount",
    "Actions",
  ];

  useEffect(() => {
    getVouchers(dispatch);
  }, [dispatch]);

  function handleSearchFunc() {
    return vouchers.filter(
      (voucher) =>
        voucher.customerCar_id.customer.name.includes(searchInput) ||
        voucher.customerCar_id.customer.name
          .toLocaleLowerCase()
          .includes(searchInput)
    );
  }

  function handlePrintBtn(e, id) {
    e.stopPropagation();
    navigate(`/tables/vouchersTable/printVoucher/${id}`);
  }

  function handleRecieveMoney(e, voucher) {
    e.stopPropagation();
    dispatch(openPayModal({ data: voucher }));
  }

  const vouchersTableRow = handleSearchFunc().map((voucher, index) => {
    return (
      <tr
        className="table_row_vouchers"
        key={index}
        onClick={() => navigate(`/tables/vouchersTable/${voucher.id}`)}
      >
        <td>{voucher.id}</td>
        <td>{voucher.customerCar_id.customer.name}</td>
        <td>{voucher.customerCar_id.customer.phone}</td>
        <td>{voucher.customerCar_id.car.brand}</td>
        <td>{voucher.customerCar_id.car.car_number}</td>
        <td>{voucher.date}</td>
        <td>{voucher.total}</td>
        <td>{voucher.payment.paid_amount}</td>
        <td>
          <button
            className="table_editBtn"
            onClick={(e) => handlePrintBtn(e, voucher.id)}
          >
            Print
          </button>
          <button
            className="refill_btn"
            onClick={(e) => handleRecieveMoney(e, voucher)}
          >
            Pay
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="voucher">
      <Table
        tablePageName="Vouchers table"
        headersList={headersList}
        serachPlaceHolder="Search Vouchers"
        dataTableRow={vouchersTableRow}
        tableRowSelector="table_row_vouchers"
        handleSearchFunc={handleSearchFunc}
        setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default VouchersTable;
