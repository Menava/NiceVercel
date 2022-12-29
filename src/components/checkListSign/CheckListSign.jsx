import React from "react";
import "./checkListSign.scss";

function CheckListSign({ signImg, signOwner }) {
  return (
    <div className="checkListSign">
      <img src={signImg} alt={signImg} />
      <p>{signOwner}</p>
    </div>
  );
}

export default CheckListSign;
