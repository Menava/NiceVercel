import React from "react";
import "./infoTag.scss";

function InfoTag({ infoTagHeader, infoTagValue }) {
  return (
    <div className="infoTag_wrapper">
      <h4>{infoTagHeader}</h4>
      <p>{infoTagValue}</p>
    </div>
  );
}

export default InfoTag;
