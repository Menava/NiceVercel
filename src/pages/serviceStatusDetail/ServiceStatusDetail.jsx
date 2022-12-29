import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ServicePlaceEmployeeService from "../../APIServices/ServicePlaceEmployeeAPI";
import ServicePlaceServiceItemService from "../../APIServices/ServicePlaceServiceItemAPI";
import "./serviceStatusDetail.scss";

import ServiceStatusDetailService from "../../components/serviceStatusDetailService/ServiceStatusDetailService";
import ServicePlaceService from "../../APIServices/ServicePlaceAPI";
import { useDispatch, useSelector } from "react-redux";
import { openAddNewServiceServiceStatusModal } from "../../redux/modalsAndDataSlice";

function ServiceStatusDetail() {
  const { servicePlaceId } = useParams();
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [servicePlace, setServicePlace] = useState({});
  const navigate = useNavigate();
  console.log("servicePlace", servicePlace);
  useEffect(() => {
    ServicePlaceServiceItemService.GetTestMethod(servicePlaceId).then((resp) =>
      setServices(resp)
    );
    ServicePlaceEmployeeService.GetServicePlaceEmployee(servicePlaceId).then(
      (resp) => setEmployees(resp)
    );
    ServicePlaceService.GetServicePlace(servicePlaceId).then((res) =>
      setServicePlace(res)
    );
  }, [servicePlaceId]);

  function addNewServiceHandle() {
    dispatch(
      openAddNewServiceServiceStatusModal({
        servicePlaceId,
        setServices,
      })
    );
  }

  function checkFinished() {
    let finished = true;
    services.forEach((ser) => {
      if (ser.status === "Working") {
        finished = false;
      }
    });
    return finished;
  }

  async function finishedHandle() {
    setServices([]);
    navigate(`/createVoucher/${servicePlaceId}`);
  }

  return (
    <>
      {servicePlace?.serviceplaces?.status !== "Free" ? (
        <div className="serviceStatusDetail_wrapper">
          <div className="servicesStatusDetail_toDoServicesWrapper">
            <h3>To do Services</h3>
            <button onClick={addNewServiceHandle}>Add New Service</button>
          </div>

          {services.map((service) => (
            <ServiceStatusDetailService
              key={service.service.id}
              serviceImageName={service.service.service_imagePath}
              serviceId={service.service.id}
              servicePlaceId={servicePlaceId}
              serviceType={service.service.service_type}
              serviceStatus={service.status}
              setServices={setServices}
              employees={employees}
              items={service.items}
              servicePlace={servicePlace}
            />
          ))}
          <div className="serviceStatusDetail_employeesWrapper">
            <h3>Employees</h3>
            <div className="serviceStatusDetail_employees">
              {employees.map((emp) => (
                <p key={emp.id}>{emp.employee_id.name}</p>
              ))}
            </div>
          </div>
          <div className="serviceStatusDetail_buttonsWrapper">
            {checkFinished() && services.length > 0 && (
              <button onClick={() => finishedHandle()}>Finished</button>
            )}
          </div>
        </div>
      ) : (
        <div>No Services Yet</div>
      )}
    </>
  );
}

export default ServiceStatusDetail;
