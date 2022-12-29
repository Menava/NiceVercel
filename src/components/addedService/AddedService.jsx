import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCustomerItem, removeService } from "../../redux/addedServicesSlice";
import {
  closeModal,
  resetWholeAddedItemQty,
} from "../../redux/modalsAndDataSlice";
import { ImCross } from "react-icons/im";

import AddedServiceAddItem from "../addedServiceAddItem/AddedServiceAddItem";
import "./addedService.scss";

function AddedService({ serviceId, serviceName, serviceFee, serviceItems }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addedServices } = useSelector((state) => state.addedService);
  const { socket } = useSelector((state) => state.socket);
  const [openAddCustomerItem, setOpenAddCustomerItem] = useState(false);
  const INITIAL_CUSTOMER_ITEM_VALUE = { name: "", qty: "" };
  const [customerItem, setCustomerItem] = useState(INITIAL_CUSTOMER_ITEM_VALUE);
  const inputedService = useSelector((state) => state.inputedService);

  function addMoreItemHandle() {
    navigate(`/services/serviceDetail/${serviceId}`);
    dispatch(closeModal());
  }

  function removeAddedItemHandle() {
    dispatch(removeService({ id: serviceId }));
    dispatch(resetWholeAddedItemQty({ addedServices, serviceName, socket }));
  }

  function calcualteSubTotals() {
    let subtotals = serviceFee;
    const toCaluateIndex = addedServices.findIndex(
      (service) => service.serviceName === serviceName
    );

    addedServices[toCaluateIndex].items.forEach((element) => {
      subtotals += element.price * element.qty;
    });

    return subtotals;
  }

  function customerAddItemOpenModalHandle() {
    setOpenAddCustomerItem(true);
  }

  function customerAddItemCloseModalHandle() {
    setOpenAddCustomerItem(false);
    setCustomerItem(INITIAL_CUSTOMER_ITEM_VALUE);
  }

  function customerItemInputHandle(e) {
    const { name, value } = e.target;

    setCustomerItem({ ...customerItem, [name]: value });
  }

  function customerAddItemHandle() {
    if (customerItem.name === "" && customerItem.qty === "") {
      return;
    }
    dispatch(
      addCustomerItem({
        id: serviceId,
        data: {
          name: customerItem.name,
          price: 0,
          qty: parseInt(customerItem.qty),
          customerPhone: inputedService.makeService.customerPhone,
        },
      })
    );
    setCustomerItem(INITIAL_CUSTOMER_ITEM_VALUE);
    setOpenAddCustomerItem(false);
  }

  useEffect(() => {
    calcualteSubTotals();
  });

  return (
    <div className="addedService">
      <ImCross
        onClick={removeAddedItemHandle}
        className="addedService_crossIcon"
      />
      {openAddCustomerItem && (
        <div className="addCustomerItem_overlay">
          <h3>Customer Item</h3>
          <div className="addCustomerItem_form">
            <input
              type="text"
              placeholder="Item name..."
              name="name"
              onChange={customerItemInputHandle}
              value={customerItem.name}
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Quantity..."
              name="qty"
              onChange={customerItemInputHandle}
              value={customerItem.qty}
              autoComplete="off"
            />
            <div className="addCustomerItemButtons_wrapper">
              <button
                className="canceclBtn"
                onClick={customerAddItemCloseModalHandle}
              >
                Cancel
              </button>
              <button className="addBtn" onClick={customerAddItemHandle}>
                Add to Item List
              </button>
            </div>
          </div>
        </div>
      )}

      <h3 className="addedService_header">{serviceName}</h3>
      <div className="addedService_serviceFeeWrapper">
        <p className="addedService_serviceFee_header">Service Fee</p>
        <p className="addedService_serviceFee">{serviceFee}</p>
      </div>
      <div className="addedService_item_headerWrapper">
        <h3 className="addedService_header">items</h3>
        <button
          className="addService_addCusItemBtn"
          onClick={customerAddItemOpenModalHandle}
        >
          Add Customer Item
        </button>
      </div>

      <div className="addedItem_wrapper">
        {serviceItems.map((item, index) => {
          return (
            <AddedServiceAddItem
              key={index}
              itemName={item.name}
              price={item.price}
              qty={item.qty}
              serviceName={serviceName}
              removeFunc={removeAddedItemHandle}
            />
          );
        })}
      </div>

      <div className="addedService_subtotalsWrapper">
        <button
          onClick={addMoreItemHandle}
          className="addedService_addMoreServiceBtn"
        >
          Add More item
        </button>
        <p className="addedService_subtotals">
          Subtotals:
          <span className="addedService_subtotals_totals">
            {calcualteSubTotals()}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AddedService;
