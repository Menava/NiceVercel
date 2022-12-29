import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ServicePlaceService from "../../APIServices/ServicePlaceAPI";
import ServiceStatus from "../../components/serviceStatus/ServiceStatus";
import { openAddNewServicePlaceModal } from "../../redux/modalsAndDataSlice";
import "./servicesStatus.scss";

function ServicesStatus() {
  const [serPlaces, setServicePlaces] = useState([]);
  const dispatch = useDispatch();
  const {
    dropdownLists: { servicePlaces },
  } = useSelector((state) => state.prepareserviceInputs);

  useEffect(() => {
    ServicePlaceService.GetServicePlaces().then((resp) =>
      setServicePlaces(resp.filter((res) => !res.name.includes("Waiting")))
    );
  }, [servicePlaces]);

  console.log("SerivcePlaces", serPlaces);
  function openAddNewServiceModalHandle() {
    dispatch(openAddNewServicePlaceModal());
  }

  return (
    <div className="servicesStatus">
      <div className="serviceStatus_headerWrapper">
        <h2 className="serviceStatus_header">Services Status</h2>
        <button onClick={openAddNewServiceModalHandle}>
          Add New Service Place
        </button>
      </div>

      <div className="servicesStatus_wrapper">
        {serPlaces?.map((servicePlace) => (
          <ServiceStatus
            key={servicePlace.id}
            servicePlaceId={servicePlace.id}
            servicePlace={`Service Place ${servicePlace.name}`}
            CarNo={servicePlace.customerCar_id?.car.car_number}
            percentage={`${servicePlace.state}%`}
            status={servicePlace.status}
            setServicePlaces={setServicePlaces}
          />
        ))}
      </div>
    </div>
  );
}

export default ServicesStatus;
