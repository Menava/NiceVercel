import React from "react";
import "./minusTables.scss";

import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaUsers, FaUserSecret, FaCar } from "react-icons/fa";
import { MdHomeRepairService } from "react-icons/md";
import TableGate from "../../components/tableGate/TableGate";

function MinusTables() {
  return (
    <div className="tables">
      <h2 className="table_name">-$ Tables</h2>
      <div className="tablesGate_wrapper">
        <TableGate
          Icon={FaUsers}
          tableGateHeader="Employee Salaries"
          path="employeesSalariesTable"
          minus
        />
        <TableGate
          Icon={MdHomeRepairService}
          tableGateHeader="General Purchases"
          path="generalPurchasesTable"
          minus
        />
        <TableGate
          Icon={AiOutlineUnorderedList}
          tableGateHeader="Items Purchases"
          path="itemPurchases"
          minus
        />
      </div>
    </div>
  );
}

export default MinusTables;
