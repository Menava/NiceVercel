import React from "react";
import "./tableGate.scss";
import { Link } from "react-router-dom";

function TableGate({ tableGateHeader, Icon, path, minus }) {
  return (
    <Link to={minus ? `/-$tables/${path}` : `/tables/${path}`} className="link">
      <div className="tableGate">
        <div className="table_block_logo">
          <Icon className="tableGate_icon" />
          <h2>{tableGateHeader}</h2>
        </div>
      </div>
    </Link>
  );
}

export default TableGate;
