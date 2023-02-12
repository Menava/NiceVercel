import React from "react";
import "./tables.scss";
import { AiOutlineUnorderedList } from "react-icons/ai";

import { FaUsers, FaUserSecret, FaCar } from "react-icons/fa";
import { MdHomeRepairService } from "react-icons/md";
import { IoCarSportSharp } from "react-icons/io";
import TableGate from "../../components/tableGate/TableGate";

function Tables() {
  return (
    <div className="tables">
      <h2 className="table_name">Data Tables</h2>
      <div className="tablesGate_wrapper">
        <TableGate
          Icon={FaUsers}
          tableGateHeader="Customers"
          path="customersTable"
        />
        <TableGate
          Icon={MdHomeRepairService}
          tableGateHeader="Services"
          path="servicesTable"
        />
        <TableGate
          Icon={AiOutlineUnorderedList}
          tableGateHeader="Vouchers"
          path="vouchersTable"
        />
        <TableGate Icon={FaCar} tableGateHeader="Items" path="itemsTable" />
        <TableGate
          Icon={FaUserSecret}
          tableGateHeader="Employees"
          path="employeesTable"
        />
        <TableGate
          Icon={FaUserSecret}
          tableGateHeader="Supplier"
          path="suppliersTable"
        />
        <TableGate
          Icon={AiOutlineUnorderedList}
          tableGateHeader="Voucher Outsource"
          path="voucherOutsource"
        />
      </div>
    </div>
  );
}

export default Tables;
