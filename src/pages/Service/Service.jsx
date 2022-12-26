import React from "react";
import "./service.scss";
import { Link } from "react-router-dom";

function Service({ imageName, serviceType, servicePrice, id }) {
  return (
    <Link to={`/services/serviceDetail/${id}`} className="link">
      <div className="service">
        <div className="service_img">
          <img
            src={`https://drive.google.com/uc?export=view&id=${imageName}`}
            alt="No Image"
          />
        </div>
        <div className="service_bottom">
          <h3>{serviceType}</h3>
          <p>Fee: {servicePrice}</p>
        </div>
      </div>
    </Link>
  );
}

export default Service;

// service_price: 200000
// service_type: "New Service Type"
