import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modalsAndDataSlice";
import AddedService from "../addedService/AddedService";
import "./appNavSidebar.scss";
import Cookies from "js-cookie";
import CustomerService from "../../APIServices/CustomerAPI";
import CarService from "../../APIServices/CarAPI";
import CustomerCarService from "../../APIServices/CustomerCarAPI";
import ServiceItemService from "../../APIServices/ServiceItemAPI";
import InitCheckService from "../../APIServices/InitCheckAPI";
import InitialImageService from "../../APIServices/InitialImageAPI";
import ServicePlaceService from "../../APIServices/ServicePlaceAPI";
import ServicePlaceEmployeeService from "../../APIServices/ServicePlaceEmployeeAPI";
import ServicePlaceServiceItemService from "../../APIServices/ServicePlaceServiceItemAPI";
import { resetAddedServices } from "../../redux/addedServicesSlice";
import { useNavigate } from "react-router-dom";
import { resetMakeService } from "../../redux/inputedServiceSlice";
import { resetInputValues } from "../../redux/prepareServiceInputSlice";
import { finishLoading, startLoading } from "../../redux/loadingSlice";

function AppNavSidebar() {
  const appNavSidebarRef = useRef();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);
  const { addedServices } = useSelector((state) => state.addedService);
  const { makeService } = useSelector((state) => state.inputedService);
  const navigate = useNavigate();

  function closeAppNavSidebar(e) {
    if (e.target === appNavSidebarRef.current) {
      dispatch(closeModal());
    }
  }

  async function makeServiceHandle() {
    dispatch(startLoading());
    const notes = "test";
    let servicePlace_id = 0;

    const initChecklist_data =
      makeService.customerSignature || makeService.employeeSignature
        ? await InitCheckService.InsertInitCheck({
            employee_sign: makeService.employeeSignature,
            customer_sign: makeService.customerSignature,
            notes: notes,
          })
        : null;

    if (initChecklist_data === 500) {
      alert("Something Went Wrong");
      dispatch(finishLoading());
      return;
    }
    const InitImage_formData = new FormData();
    makeService.errorImages.forEach((formError) => {
      InitImage_formData.append("file", formError.errorImage);
      let value_dict = {
        initcheck_id: initChecklist_data ? initChecklist_data.id : null,
        damaged_part: formError.component,
        damage_type: formError.damageType,
      };
      InitImage_formData.append("all_value", JSON.stringify(value_dict));
    });
    const imageData =
      InitialImageService.InsertInitialImage(InitImage_formData);
    if (imageData === 500) {
      alert("Something Went Wrong");
      dispatch(finishLoading());
      return;
    }
    const customer_data = await CustomerService.InsertCustomer({
      name: makeService.customerName,
      phone: makeService.customerPhone,
    });
    const car_data = await CarService.InsertCar({
      model: makeService.customerCarModel,
      year: makeService.customerCarYear,
      color: makeService.customerCarColor,
      brand: makeService.customerCarBrand,
      frame_id: makeService.frameType.id,
      car_number: makeService.customerCarNo,
    });
    const CustomerCar_data = await CustomerCarService.InsertCustomerCar({
      customer_id: customer_data.id,
      car_id: car_data.id,
    });

    if (
      makeService.servicePlace.name === "Other" ||
      makeService.servicePlace.name === "Waiting"
    ) {
      const serviceplace_data = await ServicePlaceService.InsertServicePlace({
        name: makeService.servicePlace.name,
        customerCar_id: CustomerCar_data.id,
        initChecklist_id: initChecklist_data ? initChecklist_data.id : null,
        state: "0",
        status: "On Progress",
      });
      servicePlace_id = serviceplace_data.id;
    } else {
      await ServicePlaceService.UpdateServicePlace(
        makeService.servicePlace.id,
        {
          name: makeService.servicePlace.name,
          customerCar_id: CustomerCar_data.id,
          initChecklist_id: initChecklist_data ? initChecklist_data.id : null,
          state: "0",
          status: "On Progress",
        }
      );
      servicePlace_id = makeService.servicePlace.id;
    }
    const employeeFormData = new FormData();
    employeeFormData.append("array", JSON.stringify(makeService.employees));
    employeeFormData.append("serviceplace_id", servicePlace_id);
    employeeFormData.append(
      "employee_leader_id",
      makeService.employeeLeader.id
    );
    await ServicePlaceEmployeeService.InsertServicePlaceEmployee(
      employeeFormData
    );

    const serviceFormData = new FormData();
    serviceFormData.append("array", JSON.stringify(addedServices));
    const serviceItem_array = await ServiceItemService.InsertServiceItem(
      serviceFormData
    );
    const placeServiceFormData = new FormData();
    placeServiceFormData.append("serviceplace_id", servicePlace_id);
    placeServiceFormData.append(
      "serviceItem_array",
      JSON.stringify(serviceItem_array)
    );
    await ServicePlaceServiceItemService.InsertServicePlaceServiceItem(
      placeServiceFormData
    );
    Cookies.remove("items", { path: "/" });
    Cookies.remove("addedService", { path: "/" });
    dispatch(resetAddedServices({ navigate }));
    dispatch(finishLoading());
    dispatch(closeModal());
    dispatch(resetMakeService());
    dispatch(resetInputValues());
  }

  return (
    <div
      className="appNavSidebarWrapper"
      ref={appNavSidebarRef}
      onClick={(e) => closeAppNavSidebar(e)}
    >
      <div className="appNavSidebar">
        <h2 className="appNavSidebar_header">
          {addedServices.length > 0 ? "Added Services" : "Add service first"}
        </h2>

        <div className="appNavServicesWrapper">
          {addedServices.map((service) => (
            <AddedService
              key={service.id}
              serviceId={service.id}
              serviceName={service.serviceName}
              serviceFee={service.serviceFee}
              serviceItems={service.items}
              subtotals={service.subtotals}
            />
          ))}
        </div>
        {addedServices.length > 0 && (
          <button
            disabled={loading}
            className="appNavSidebar_makeServiceBtn"
            onClick={makeServiceHandle}
          >
            {loading ? "Loading" : "Make Service"}
          </button>
        )}
      </div>
    </div>
  );
}

export default AppNavSidebar;
