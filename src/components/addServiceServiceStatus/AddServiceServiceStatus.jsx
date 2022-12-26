import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modalsAndDataSlice";
import { BsSearch } from "react-icons/bs";

import "./addServiceServiceStatus.scss";
import { useEffect } from "react";
import ServiceService from "../../APIServices/ServiceAPI";
import ServicePlaceServiceItemService from "../../APIServices/ServicePlaceServiceItemAPI";

function AddServiceServiceStatus() {
  const addSerivceRef = useRef();
  const dispatch = useDispatch();
  const [serviceNames, setServiceNames] = useState([]);
  const [servicePlaceServices, setServicePlaceServices] = useState([]);
  const modalsAndData = useSelector((state) => state.modalsAndData);
  const [searchServiceInput, setSearchServiceInput] = useState([]);
  useEffect(() => {
    ServiceService.GetServices().then((res) => setServiceNames(res));
    ServicePlaceServiceItemService.GetTestMethod(
      modalsAndData.servicePlaceId
    ).then((resp) => {
      setServicePlaceServices(resp);
    });
  }, []);

  function closeAddNewSerivceModalHandle(e) {
    if (e.target === addSerivceRef.current) {
      dispatch(closeModal());
    }
  }

  async function addNewServiceHandle(serviceId) {
    await ServicePlaceServiceItemService.AppendItem({
      servicePlace_id: modalsAndData.servicePlaceId,
      service_id: serviceId,
      item_name: "None",
      item_id: "None",
      item_price: "None",
      customer_id: "None",
    });

    await ServicePlaceServiceItemService.GetTestMethod(
      modalsAndData.servicePlaceId
    ).then((resp) => {
      modalsAndData.setServices(resp);
    });
    dispatch(closeModal());
  }

  function fitlerdServices() {
    const copiedServicesAry = [...serviceNames];

    servicePlaceServices.forEach((servicePlace) => {
      copiedServicesAry.forEach((service, index) => {
        if (service.id === servicePlace.service.id) {
          copiedServicesAry.splice(index, 1);
        }
      });
    });

    return copiedServicesAry.filter(
      (serv) =>
        serv.service_type.includes(searchServiceInput) ||
        serv.service_type.toLocaleLowerCase().includes(searchServiceInput) ||
        serv.service_type.toLocaleUpperCase().includes(searchServiceInput)
    );
  }

  return (
    <div
      className="addServiceWrapper"
      ref={addSerivceRef}
      onClick={closeAddNewSerivceModalHandle}
    >
      <div className="addNewServiceModal">
        <div className="addNewService_searchWrapper">
          <BsSearch className="addNewService_searchIcon" />
          <input
            type="text"
            placeholder="Search Service"
            onChange={(e) => setSearchServiceInput(e.target.value)}
          />
        </div>
        <div className="addNewServiceModal_servicesWrapper">
          {fitlerdServices().map((service) => (
            <div
              className="addNewServiceModal_serviceWrapper"
              key={service.id}
              onClick={() => addNewServiceHandle(service.id)}
            >
              <div className="imageWrapper">
                <img
                  src={`https://drive.google.com/uc?export=view&id=${service.service_imagePath}`}
                  alt={service.service_type}
                />
                <div className="imageOverlay">
                  <p>Click to add Service</p>
                </div>
              </div>
              <p>{service.service_type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddServiceServiceStatus;
