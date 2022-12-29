import React from "react";
import ServicePlaceService from "../../APIServices/ServicePlaceAPI";
import ServicePlaceServiceItemService from "../../APIServices/ServicePlaceServiceItemAPI";
import "./serviceCheckBox.scss";

function ServiceCheckBox({
  serviceName,
  status,
  serviceId,
  servicePlaceId,
  setServices,
  setServicePlaces,
}) {
  async function handleCheckBox() {
    await ServicePlaceServiceItemService.UpdateServicePlaceServiceItem({
      service_id: serviceId,
      servicePlace_id: servicePlaceId,
      service_status: status === "Done" ? "Working" : "Done",
    });
    await ServicePlaceServiceItemService.GetTestMethod(servicePlaceId).then(
      (resp) => setServices(resp)
    );
    await ServicePlaceService.GetServicePlaces().then((resp) =>
      setServicePlaces(resp)
    );
  }

  return (
    <div className="serviceCheckBox" onClick={handleCheckBox}>
      <input
        type="checkbox"
        checked={status === "Done" ? true : false}
        onChange={() => console.log("changed")}
      />
      <h3>{serviceName}</h3>
    </div>
  );
}

export default ServiceCheckBox;
