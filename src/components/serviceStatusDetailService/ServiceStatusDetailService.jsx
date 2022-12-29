import React, { useRef } from "react";
import "./ServiceStatusDetailService.scss";
import { FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import ServicePlaceServiceItemService from "../../APIServices/ServicePlaceServiceItemAPI";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  openAddCustomerItemServiceStatusModal,
  openAddItemServiceStatusModal,
} from "../../redux/modalsAndDataSlice";
import { getItems } from "../../redux/Apicall";

function ServiceStatusDetailService({
  serviceImageName,
  serviceType,
  servicePlaceId,
  serviceId,
  serviceStatus,
  setServices,
  items,
  servicePlace,
}) {
  const dispatch = useDispatch();
  const serviceStatusRef = useRef();
  const inputCheckboxRef = useRef();
  async function handleDeleteService(servicePlaceId, itemId = "None") {
    await ServicePlaceServiceItemService.DeleteServicePlaceServiceItem(
      servicePlaceId,
      { service_id: serviceId, item_id: itemId, customerItem_id: "None" }
    );
    await ServicePlaceServiceItemService.GetTestMethod(servicePlaceId).then(
      (resp) => setServices(resp)
    );
    Cookies.remove("items", { path: "/" });
  }

  async function handleCheckBox(e) {
    if (
      e.target === serviceStatusRef.current ||
      e.target === inputCheckboxRef.current
    ) {
      await ServicePlaceServiceItemService.UpdateServicePlaceServiceItem({
        service_id: serviceId,
        servicePlace_id: servicePlaceId,
        service_status: serviceStatus === "Done" ? "Working" : "Done",
      });
      await ServicePlaceServiceItemService.GetTestMethod(servicePlaceId).then(
        (resp) => setServices(resp)
      );
    }
  }

  async function handleItemDelte(itemId) {
    await ServicePlaceServiceItemService.DeleteServicePlaceServiceItem(
      servicePlaceId,
      { service_id: serviceId, item_id: itemId, customerItem_id: "None" }
    );
    await ServicePlaceServiceItemService.GetTestMethod(servicePlaceId).then(
      (resp) => setServices(resp)
    );
    Cookies.remove("items", { path: "/" });
  }

  async function handleDeleteCustomerItem(itemId) {
    await ServicePlaceServiceItemService.DeleteServicePlaceServiceItem(
      servicePlaceId,
      { service_id: serviceId, item_id: "None", customerItem_id: itemId }
    );

    await ServicePlaceServiceItemService.GetTestMethod(servicePlaceId).then(
      (resp) => {
        setServices(resp);
      }
    );

    Cookies.remove("items", { path: "/" });
  }

  async function handlePlusOrMinusItem(method, item) {
    if (item.hasOwnProperty("customer_id")) {
      await ServicePlaceServiceItemService.EditItemQuantity(servicePlaceId, {
        service_id: serviceId,
        item_id: "None",
        customerItem_id: item.id,
        method,
      });
    } else {
      await ServicePlaceServiceItemService.EditItemQuantity(servicePlaceId, {
        service_id: serviceId,
        item_id: item.id,
        customerItem_id: "None",
        method,
      });
    }
    await ServicePlaceServiceItemService.GetTestMethod(servicePlaceId).then(
      (resp) => {
        setServices(resp);
      }
    );
    Cookies.remove("items", { path: "/" });
  }

  function addItemHandle() {
    dispatch(
      openAddItemServiceStatusModal({
        serviceId,
        servicePlaceId,
        serviceItems: items,
        setServices,
      })
    );
    getItems(dispatch);
  }

  function addCustomerItemHandle() {
    dispatch(
      openAddCustomerItemServiceStatusModal({
        serviceId,
        servicePlaceId,
        serviceItems: items,
        setServices,
        customerId: servicePlace.serviceplaces.customerCar_id.customer.id,
      })
    );
  }

  return (
    <div className="serviceStatusDetailService">
      <div
        className="serviceStatusDetailService_wrapper"
        onClick={handleCheckBox}
      >
        <div className="serviceStatusDetailService_left" ref={serviceStatusRef}>
          <img
            src={`https://drive.google.com/uc?export=view&id=${serviceImageName}`}
            alt="serviceStatusDetailImage"
          />
          <h3>
            {serviceType} ({serviceStatus})
          </h3>
        </div>
        <div className="serviceStatusDetailService_right">
          <input
            ref={inputCheckboxRef}
            type="checkbox"
            checked={serviceStatus === "Done" ? true : false}
            onChange={() => console.log("changed")}
          />
          <FaTrash
            className="serviceStatusDetail_trashIcon"
            onClick={() => handleDeleteService(servicePlaceId)}
          />
        </div>
      </div>
      <div className="serviceDetailService_itemsWrapper">
        {items
          .filter((item) => item.hasOwnProperty("customer_id"))
          .map((itm) => (
            <div className="serviceDetailService_items" key={itm.id}>
              <div className="itemTagWrapper">
                <button
                  className="itemMinusBtn"
                  onClick={() => handlePlusOrMinusItem("Minus", itm)}
                >
                  -
                </button>
                <p>
                  {itm.name} ({itm.quantity} ) Cus
                </p>
                <button
                  className="itemsPlusBtn"
                  onClick={() => handlePlusOrMinusItem("Plus", itm)}
                >
                  +
                </button>

                <div
                  className="serviceDetailService_items_removeIconWrapper"
                  onClick={() => handleDeleteCustomerItem(itm.id)}
                >
                  <ImCross className="serviceDetailService_items_removeIcon" />
                </div>
              </div>
            </div>
          ))}
        {items
          .filter((item) => !item.hasOwnProperty("customer_id"))
          .map((itm) => (
            <div className="serviceDetailService_items" key={itm.id}>
              <div className="itemTagWrapper">
                <button
                  className="itemMinusBtn"
                  onClick={() => handlePlusOrMinusItem("Minus", itm)}
                >
                  -
                </button>
                <p>
                  {itm.name} ({itm.quantity} )
                </p>
                <button
                  className="itemsPlusBtn"
                  onClick={() => handlePlusOrMinusItem("Plus", itm)}
                >
                  +
                </button>

                <div
                  className="serviceDetailService_items_removeIconWrapper"
                  onClick={() => handleItemDelte(itm.id)}
                >
                  <ImCross className="serviceDetailService_items_removeIcon" />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="buttonsWrapper">
        <button className="addItem_btn" onClick={addCustomerItemHandle}>
          Add Customer item
        </button>
        <button className="addItem_btn" onClick={addItemHandle}>
          Add item
        </button>
      </div>
    </div>
  );
}

export default ServiceStatusDetailService;
