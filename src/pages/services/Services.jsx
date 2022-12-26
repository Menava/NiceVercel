import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../redux/Apicall";
import Service from "../Service/Service";
import { BsSearch } from "react-icons/bs";

import "./services.scss";
function Services() {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.modalsAndData);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getServices(dispatch);
  }, [dispatch]);

  // Handling serach value
  function handleSearchFunc() {
    return services.filter(
      (service) =>
        service.service_type.includes(searchInput) ||
        service.service_type.toLocaleLowerCase().includes(searchInput)
    );
  }

  return (
    <div>
      <div className="services_header_wrapper">
        <h2 className="services_header">Available Services</h2>
        <div className="table_searchWrapper">
          <div className="table_searchInput">
            <BsSearch className="table_searchInputIcon" />
            <input
              type="text"
              placeholder="Search service...."
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
          </div>
        </div>
      </div>
      <div className="services_wrapper">
        {handleSearchFunc().map((service) => (
          <Service
            key={service.id}
            imageName={service.service_imagePath}
            serviceType={service.service_type}
            servicePrice={service.service_price}
            id={service.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Services;
