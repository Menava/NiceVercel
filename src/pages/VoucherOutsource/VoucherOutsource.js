import React, { useEffect, useState } from "react";
import VoucherOutsourceService from "../../APIServices/VoucherOutsourceAPI";
import Table from "../../components/table/Table";

const VoucherOutsource = () => {
  const [outSources, setOutSources] = useState([]);
  const [showUnpaid, setShowUnpaid] = useState(false);

  const headersList = [
    "No",
    "Id",
    "Source",
    "Item",
    "Quantity",
    "Price",
    "Totals",
    "Status",
    "Paid Date",
    "Actions",
  ];

  const payHandle = async (e, outsourceId) => {
    console.log('Test')
    e.stopPropagation();
    const response = await VoucherOutsourceService.UpdateVoucherOutsource(
      outsourceId
    );
    console.log('Test2')
    const copied = [...outSources];
    setOutSources(
      copied.map((cop) => (cop.id === response.id ? response : cop))
    );
    console.log('Test3')
  };

  const handleData = () => {
    if (showUnpaid) {
      return outSources.filter((source) => !source.status);
    }
    return outSources;
  };

  useEffect(() => {
    const fetchOutsoure = async () => {
      const response = await VoucherOutsourceService.GetVoucherOutsources();
      setOutSources(response);
    };

    fetchOutsoure();
  }, []);

  const voucherOutsourceTableRow = handleData().map((outsource, index) => {
    return (
      <tr
        className="table_row_customers"
        key={index}
        // onClick={() => handleNavigatePage(outsource.id)}
      >
        <td>{index + 1}</td>
        <td>{outsource.id}</td>
        <td>{outsource.source_name}</td>
        <td>{outsource.item_name}</td>
        <td>{outsource.quantity}</td>
        <td>{outsource.price}</td>
        <td>{outsource.total}</td>
        <td>{outsource.status ? "Paid" : "Unpaid"}</td>
        <td>{outsource.paid_date}</td>
        <td>
          <button
            className="table_editBtn"
            onClick={(e) => payHandle(e, outsource.id)}
          >
            {outsource.status ? "Unpay" : "Pay"}
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Table
        noSearchBar
        todayData="Unpaids"
        todayVoucherDataHandle={setShowUnpaid}
        // addButtonName="Add New Customer"
        headersList={headersList}
        serachPlaceHolder="Search Customers"
        tablePageName="Customer Table"
        dataTableRow={voucherOutsourceTableRow}
        tableRowSelector="table_row_customers"
        // addModalOpenHandle={openAddModalHandle}
        // setSearchInput={setSearchInput}
      />
    </div>
  );
};

export default VoucherOutsource;
