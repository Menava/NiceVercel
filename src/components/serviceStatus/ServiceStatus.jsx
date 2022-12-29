import React, { useState, useEffect } from "react";
import "./serviceStatus.scss";
import { BsThreeDots } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import ServiceCheckBox from "../serviceCheckBox/ServiceCheckBox";
import ServicePlaceServiceItemService from "../../APIServices/ServicePlaceServiceItemAPI";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function ServiceStatus({
  servicePlace,
  CarNo,
  percentage,
  status,
  servicePlaceId,
  setServicePlaces,
}) {
  const [openService, setOpenService] = useState(false);
  const [services, setServices] = useState([]);
  const serviceStatusRef = useRef();

  useEffect(() => {
    ServicePlaceServiceItemService.GetTestMethod(servicePlaceId).then((resp) =>
      setServices(resp)
    );
  }, []);

  function handleFinishedCount() {
    let count = 0;
    services.forEach((service) => {
      if (service.status === "Done") {
        count++;
      }
    });
    return count;
  }

  const navigate = useNavigate();
  return (
    <div
      className={
        openService ? "serviceStatus_wrapper active" : "serviceStatus_wrapper"
      }
    >
      {openService ? (
        <ImCross
          className="serviceStatus_DotIcon"
          onClick={() => {
            setOpenService((state) => !state);
          }}
        />
      ) : (
        <BsThreeDots
          className="serviceStatus_DotIcon"
          onClick={() => {
            setOpenService((state) => !state);
          }}
        />
      )}

      <div
        className="serviceStatus"
        onClick={(e) => {
          e.target === serviceStatusRef.current &&
            navigate(`/serviceStatus/${servicePlaceId}`);
        }}
        ref={serviceStatusRef}
      >
        {openService && (
          <>
            <div className="serviceStatus_optionsWrapper">
              <div className="servieStatus_servicesWrapper">
                {services.map((service) => (
                  <ServiceCheckBox
                    serviceName={service.service.service_type}
                    status={service.status}
                    key={service.service.id}
                    serviceId={service.service.id}
                    servicePlaceId={servicePlaceId}
                    setServices={setServices}
                    setServicePlaces={setServicePlaces}
                  />
                ))}
              </div>
              <div className="serviceStatus_finishedWrapper">
                <p>{`( ${handleFinishedCount()} out of ${
                  services.length
                } )`}</p>
                <button className="serviceStatus_finishedBtn">Finished</button>
              </div>
            </div>
          </>
        )}

        <div className="servicePlace_infoWrapper">
          <h3>{servicePlace}</h3>
          <p>{CarNo}</p>
        </div>
      </div>
      <div className="serviceStatus_percantageBarWrapper">
        <div
          className="serviceStatus_percantageBar"
          style={{ width: percentage }}
        ></div>
      </div>
      <h4>{status}</h4>
    </div>
  );
}

export default ServiceStatus;
