import React, { useState } from "react";
import "./customerDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import VoucherService from "../../APIServices/VoucherAPI";
import Table from "../../components/table/Table";
import { openPayModal } from "../../redux/modalsAndDataSlice";
import { useDispatch } from "react-redux";
function CustomerDetails() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const dispatch = useDispatch();
  const headersList = [
    "VoucherId",
    "Car",
    "CarNo",
    "Voucher Date",
    "Total",
    "Paid Amount",
    "Actions",
  ];
  useEffect(() => {
    VoucherService.GetCustomeVouchers(customerId).then((resp) =>
      setCustomerData(resp)
    );
  }, [customerId]);
  console.log("customerData", customerData);

  const vouchersTableRow = customerData.map((voucher, index) => {
    return (
      <tr
        className="table_row_customer_details"
        key={index}
        onClick={() => navigate(`/tables/vouchersTable/${voucher.id}`)}
      >
        <td>{voucher.id}</td>
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

  function handlePrintBtn(e, id) {
    e.stopPropagation();
    navigate(`/tables/vouchersTable/printVoucher/${id}`);
  }

  function handleRecieveMoney(e, voucher) {
    e.stopPropagation();
    dispatch(openPayModal({ data: voucher }));
  }

  return (
    <div>
      <div className="customer_detail_header">
        <h3>
          {customerData[0]?.customerCar_id.customer.name
            ? customerData[0]?.customerCar_id.customer.name
            : "No voucher"}
        </h3>
      </div>
      <Table
        // tablePageName="Vouchers table"
        headersList={headersList}
        noSearchBar
        // serachPlaceHolder="Search Vouchers"
        dataTableRow={vouchersTableRow}
        tableRowSelector="table_row_customer_details"
        // handleSearchFunc={handleSearchFunc}
        // setSearchInput={setSearchInput}
      />
    </div>
  );
}

export default CustomerDetails;
